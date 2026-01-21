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

interface BasicInfoTabProps {
  initialData: any;
}

export function BasicInfoTab({ initialData }: BasicInfoTabProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
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
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Update your personal information and bio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Tagline</label>
          <Input
            value={formData.tagline}
            onChange={(e) =>
              setFormData({ ...formData, tagline: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm font-medium">Bio</label>
          <Input
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">About</label>
          <Textarea
            value={formData.about}
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
            rows={6}
          />
        </div>
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
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              value={formData.contact.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: {
                    ...formData.contact,
                    email: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">WhatsApp</label>
            <Input
              value={formData.contact.whatsapp}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: {
                    ...formData.contact,
                    whatsapp: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">Location</label>
            <Input
              value={formData.contact.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: {
                    ...formData.contact,
                    location: e.target.value,
                  },
                })
              }
            />
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
