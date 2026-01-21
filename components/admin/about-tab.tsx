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
import { Save, Loader2, CheckCircle2 } from "lucide-react";
import { updateProfile } from "@/actions/portfolio";
import { useRouter } from "next/navigation";

interface AboutTabProps {
  initialData: any;
}

export function AboutTab({ initialData }: AboutTabProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    about: initialData.about,
    aboutImage: initialData.aboutImage || "",
    stats: initialData.stats,
    // Keep other fields for server action compatibility
    name: initialData.name,
    tagline: initialData.tagline,
    bio: initialData.bio,
    contact: initialData.contact,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateProfile(formData);

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
        <CardTitle>About Section</CardTitle>
        <CardDescription>
          Manage your detailed about information and statistics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">
            About (Full Description)
          </label>
          <Textarea
            value={formData.about}
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
            rows={8}
            placeholder="Write a detailed description about yourself, your passion, and your journey..."
          />
          <p className="text-xs text-muted-foreground mt-1">
            This will be displayed in the About section of your portfolio
          </p>
        </div>

        <div>
          <label className="text-sm font-medium">Profile Image</label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              value={formData.aboutImage}
              onChange={(e) =>
                setFormData({ ...formData, aboutImage: e.target.value })
              }
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
                  e.target.disabled = true;
                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: data,
                  });

                  if (!res.ok) throw new Error("Upload failed");

                  const json = await res.json();
                  if (json.success) {
                    setFormData({ ...formData, aboutImage: json.url });
                  }
                } catch (err) {
                  alert("Failed to upload image");
                  console.error(err);
                } finally {
                  e.target.disabled = false;
                  e.target.value = "";
                }
              }}
            />
          </div>
          {formData.aboutImage && (
            <div className="mt-4 relative w-full h-64 bg-muted rounded-md overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.aboutImage}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Years Experience</label>
              <Input
                value={formData.stats.yearsExperience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: {
                      ...formData.stats,
                      yearsExperience: e.target.value,
                    },
                  })
                }
                placeholder="e.g., 2+"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Projects Completed</label>
              <Input
                value={formData.stats.projectsCompleted}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: {
                      ...formData.stats,
                      projectsCompleted: e.target.value,
                    },
                  })
                }
                placeholder="e.g., 7"
              />
            </div>
          </div>
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
