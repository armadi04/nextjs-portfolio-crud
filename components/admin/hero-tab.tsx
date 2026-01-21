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

interface HeroTabProps {
  initialData: any;
}

export function HeroTab({ initialData }: HeroTabProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData.name,
    tagline: initialData.tagline,
    bio: initialData.bio,
    heroDescription: initialData.heroDescription || "",
    contact: initialData.contact,
    stats: initialData.stats,
    about: initialData.about, // Keep for server action compatibility
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
        <CardTitle>Hero Section (Home Page)</CardTitle>
        <CardDescription>
          Manage the main content displayed on your homepage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Tagline</label>
          <Input
            value={formData.tagline}
            onChange={(e) =>
              setFormData({ ...formData, tagline: e.target.value })
            }
            placeholder="e.g., Full Stack Developer"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Bio (Short Description)</label>
          <Input
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="e.g., Fast Learner | Team Work | Hard Worker"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Hero Description</label>
          <Textarea
            value={formData.heroDescription}
            onChange={(e) =>
              setFormData({ ...formData, heroDescription: e.target.value })
            }
            rows={3}
            placeholder="Short description for homepage (e.g., A growing full-stack developer passionate about...)"
          />
          <p className="text-xs text-muted-foreground mt-1">
            This will be displayed below your bio on the homepage
          </p>
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
              placeholder="your@email.com"
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
              placeholder="+62 xxx-xxxx-xxxx"
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
              placeholder="City, Country"
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
