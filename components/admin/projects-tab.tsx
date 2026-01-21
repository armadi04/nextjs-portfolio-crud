"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, Loader2, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { updateProjects } from "@/actions/portfolio";
import { useRouter } from "next/navigation";

interface ProjectsTabProps {
  initialData: any[];
}

export function ProjectsTab({ initialData }: ProjectsTabProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(
    initialData.map((p) => ({
      ...p,
      tags: typeof p.tags === "string" ? JSON.parse(p.tags) : p.tags || [],
    }))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateProjects(formData);

    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      router.refresh();
    } else {
      alert(`Failed to save: ${result.error}`);
    }

    setIsSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Manage your project portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {formData.map((project, index) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">Project {index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newProjects = formData.filter(
                        (_, i) => i !== index
                      );
                      setFormData(newProjects);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={project.title || ""}
                  onChange={(e) => {
                    const newProjects = [...formData];
                    newProjects[index].title = e.target.value;
                    setFormData(newProjects);
                  }}
                  placeholder="Project title"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={project.month || ""}
                    onChange={(e) => {
                      const newProjects = [...formData];
                      newProjects[index].month = e.target.value;
                      setFormData(newProjects);
                    }}
                    placeholder="Month"
                  />
                  <Input
                    value={project.year || ""}
                    onChange={(e) => {
                      const newProjects = [...formData];
                      newProjects[index].year = e.target.value;
                      setFormData(newProjects);
                    }}
                    placeholder="Year"
                  />
                </div>
                <Input
                  value={project.link || ""}
                  onChange={(e) => {
                    const newProjects = [...formData];
                    newProjects[index].link = e.target.value;
                    setFormData(newProjects);
                  }}
                  placeholder="Project link"
                />
                <Input
                  value={project.image || ""}
                  onChange={(e) => {
                    const newProjects = [...formData];
                    newProjects[index].image = e.target.value;
                    setFormData(newProjects);
                  }}
                  placeholder="Image URL"
                />
                <Textarea
                  value={project.description || ""}
                  onChange={(e) => {
                    const newProjects = [...formData];
                    newProjects[index].description = e.target.value;
                    setFormData(newProjects);
                  }}
                  placeholder="Description"
                  rows={3}
                />
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Tags (comma-separated)
                  </label>
                  <Input
                    value={
                      Array.isArray(project.tags) ? project.tags.join(", ") : ""
                    }
                    onChange={(e) => {
                      const newProjects = [...formData];
                      newProjects[index].tags = e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter((t) => t);
                      setFormData(newProjects);
                    }}
                    placeholder="React, Next.js, TypeScript"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              setFormData([
                ...formData,
                {
                  title: "",
                  month: "",
                  year: "",
                  link: "",
                  image: "",
                  description: "",
                  tags: [],
                },
              ]);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          size="lg"
          onClick={handleSave}
          disabled={isSaving}
          className="min-w-[150px]"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
