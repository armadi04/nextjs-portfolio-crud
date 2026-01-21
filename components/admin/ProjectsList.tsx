"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateProjectOrder, deleteProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

// Define simplified type locally to avoid importing full Prisma type client-side if unnecessary
type Project = {
  id: string;
  title: string;
  month: string;
  year: string;
  order: number;
};

function SortableItem({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-2">
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab hover:text-primary touch-none"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="flex-1">
            <h3 className="font-semibold">{project.title}</h3>
            <p className="text-sm text-muted-foreground">
              {project.month} {project.year}
            </p>
          </div>

          <div className="flex gap-2">
            <Button size="icon" variant="ghost" asChild>
              <Link href={`/dashboard/projects/${project.id}`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDelete(project.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ProjectsList({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  // Sync state with props if seeded data changes
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update server
        const updates = newItems.map((item, index) => ({
          id: item.id,
          order: index,
        }));
        updateProjectOrder(updates);

        return newItems;
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      // Optimistic update
      setProjects(projects.filter((p) => p.id !== id));
      await deleteProject(id);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={projects.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {projects.map((project) => (
            <SortableItem
              key={project.id}
              project={project}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
