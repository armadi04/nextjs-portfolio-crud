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
import { updateEducation } from "@/actions/portfolio";
import { useRouter } from "next/navigation";

interface EducationTabProps {
  initialData: any[];
}

export function EducationTab({ initialData }: EducationTabProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateEducation(formData);

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
        <CardTitle>Education</CardTitle>
        <CardDescription>Manage your educational background</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {formData.map((edu, index) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">Education {index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newEdu = formData.filter((_, i) => i !== index);
                      setFormData(newEdu);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...formData];
                    newEdu[index].degree = e.target.value;
                    setFormData(newEdu);
                  }}
                  placeholder="Degree"
                />
                <Input
                  value={edu.institution}
                  onChange={(e) => {
                    const newEdu = [...formData];
                    newEdu[index].institution = e.target.value;
                    setFormData(newEdu);
                  }}
                  placeholder="Institution"
                />
                <Input
                  value={edu.period}
                  onChange={(e) => {
                    const newEdu = [...formData];
                    newEdu[index].period = e.target.value;
                    setFormData(newEdu);
                  }}
                  placeholder="Period"
                />
                <Textarea
                  value={edu.description}
                  onChange={(e) => {
                    const newEdu = [...formData];
                    newEdu[index].description = e.target.value;
                    setFormData(newEdu);
                  }}
                  placeholder="Description"
                  rows={3}
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
                  degree: "",
                  institution: "",
                  period: "",
                  description: "",
                },
              ]);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Education
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
