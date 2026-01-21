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
import { updateExperience } from "@/actions/portfolio";
import { useRouter } from "next/navigation";

interface ExperienceTabProps {
  initialData: any[];
}

export function ExperienceTab({ initialData }: ExperienceTabProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(
    initialData.map((exp) => ({
      ...exp,
      description: Array.isArray(exp.description)
        ? exp.description
        : exp.description?.split("\n") || [],
    }))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateExperience(formData);

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
        <CardTitle>Experience</CardTitle>
        <CardDescription>Manage your work experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {formData.map((exp, index) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">Experience {index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newExp = formData.filter((_, i) => i !== index);
                      setFormData(newExp);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={exp.title}
                  onChange={(e) => {
                    const newExp = [...formData];
                    newExp[index].title = e.target.value;
                    setFormData(newExp);
                  }}
                  placeholder="Job title"
                />
                <Input
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...formData];
                    newExp[index].company = e.target.value;
                    setFormData(newExp);
                  }}
                  placeholder="Company"
                />
                <Input
                  value={exp.period}
                  onChange={(e) => {
                    const newExp = [...formData];
                    newExp[index].period = e.target.value;
                    setFormData(newExp);
                  }}
                  placeholder="Period"
                />
                <Textarea
                  value={exp.description.join("\n")}
                  onChange={(e) => {
                    const newExp = [...formData];
                    newExp[index].description = e.target.value.split("\n");
                    setFormData(newExp);
                  }}
                  placeholder="Description (one per line)"
                  rows={4}
                />
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
                  company: "",
                  period: "",
                  description: [],
                },
              ]);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
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
