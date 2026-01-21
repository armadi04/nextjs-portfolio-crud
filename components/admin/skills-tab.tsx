"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, Loader2, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { updateSkills } from "@/actions/portfolio";
import { useRouter } from "next/navigation";

interface SkillsTabProps {
  initialData: any;
}

export function SkillsTab({ initialData }: SkillsTabProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateSkills(formData);

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
        <CardTitle>Skills</CardTitle>
        <CardDescription>Manage your technical skills</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {(["frontend", "backend", "others"] as const).map((category) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{category}</h3>
              {formData[category].map((skill: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={skill.name}
                    onChange={(e) => {
                      const newSkills = { ...formData };
                      newSkills[category][index].name = e.target.value;
                      setFormData(newSkills);
                    }}
                    placeholder="Skill name"
                  />
                  <Input
                    value={skill.icon}
                    onChange={(e) => {
                      const newSkills = { ...formData };
                      newSkills[category][index].icon = e.target.value;
                      setFormData(newSkills);
                    }}
                    placeholder="Icon"
                    className="w-32"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      const newSkills = { ...formData };
                      newSkills[category] = newSkills[category].filter(
                        (_: any, i: number) => i !== index
                      );
                      setFormData(newSkills);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  const newSkills = { ...formData };
                  newSkills[category] = [
                    ...newSkills[category],
                    { name: "", icon: "code" },
                  ];
                  setFormData(newSkills);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add {category} Skill
              </Button>
            </div>
          ))}
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
