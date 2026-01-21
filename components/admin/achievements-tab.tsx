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
import { updateAchievements } from "@/actions/portfolio";
import { useRouter } from "next/navigation";

interface AchievementsTabProps {
  initialData: any[];
}

export function AchievementsTab({ initialData }: AchievementsTabProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(
    initialData.map((a) => ({
      ...a,
      image: a.image || "",
    }))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateAchievements(formData);

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
        <CardTitle>Achievements</CardTitle>
        <CardDescription>Manage your achievements and awards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {formData.map((achievement, index) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">Achievement {index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newAch = formData.filter((_, i) => i !== index);
                      setFormData(newAch);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={achievement.title}
                  onChange={(e) => {
                    const newAch = [...formData];
                    newAch[index].title = e.target.value;
                    setFormData(newAch);
                  }}
                  placeholder="Achievement title"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image</label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={achievement.image}
                      onChange={(e) => {
                        const newAch = [...formData];
                        newAch[index].image = e.target.value;
                        setFormData(newAch);
                      }}
                      placeholder="Image URL"
                      className="flex-1"
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      className="w-[200px]"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const data = new FormData();
                        data.append("file", file);

                        try {
                          // Show loading indication on the button if possible, or just wait
                          e.target.disabled = true;
                          const res = await fetch("/api/upload", {
                            method: "POST",
                            body: data,
                          });

                          if (!res.ok) throw new Error("Upload failed");

                          const json = await res.json();
                          if (json.success) {
                            const newAch = [...formData];
                            newAch[index].image = json.url;
                            setFormData(newAch);
                          }
                        } catch (err) {
                          alert("Failed to upload image");
                          console.error(err);
                        } finally {
                          e.target.disabled = false;
                          e.target.value = ""; // Reset input
                        }
                      }}
                    />
                  </div>
                  {achievement.image && (
                    <div className="mt-2 relative w-full h-40 bg-muted rounded-md overflow-hidden">
                      {/* Using nice next/image or simple img tag for preview */}
                      <img
                        src={achievement.image}
                        alt="Preview"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
                <Textarea
                  value={achievement.description}
                  onChange={(e) => {
                    const newAch = [...formData];
                    newAch[index].description = e.target.value;
                    setFormData(newAch);
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
                { title: "", description: "", image: "" },
              ]);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Achievement
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
