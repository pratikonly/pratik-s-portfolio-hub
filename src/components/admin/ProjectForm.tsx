import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateProject, useUpdateProject, type Project, type ProjectInsert } from '@/hooks/useProjects';

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
}

export function ProjectForm({ project, onClose }: ProjectFormProps) {
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [liveUrl, setLiveUrl] = useState(project?.live_url || '');
  const [category, setCategory] = useState<'website' | 'app' | 'ui'>(project?.category || 'website');
  const [techInput, setTechInput] = useState(project?.tech.join(', ') || '');
  const [displayOrder, setDisplayOrder] = useState(project?.display_order || 0);
  const [imageUrl, setImageUrl] = useState(project?.image_url || '');

  const isEditing = !!project;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tech = techInput.split(',').map(t => t.trim()).filter(Boolean);
    
    const projectData: ProjectInsert = {
      title,
      description,
      live_url: liveUrl,
      category,
      tech,
      display_order: displayOrder,
      image_url: imageUrl || null,
    };

    try {
      if (isEditing) {
        await updateProject.mutateAsync({ id: project.id, updates: projectData });
      } else {
        await createProject.mutateAsync(projectData);
      }
      onClose();
    } catch (error) {
      // Error handled by mutation hooks
    }
  };

  const isPending = createProject.isPending || updateProject.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {isEditing ? 'Edit Project' : 'Add New Project'}
        </h3>
        <Button type="button" variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project name"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief project description"
            rows={3}
            required
          />
        </div>

        <div>
          <Label htmlFor="liveUrl">Live URL *</Label>
          <Input
            id="liveUrl"
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://example.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="imageUrl">Thumbnail URL *</Label>
          <Input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/thumbnail.png"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Paste a direct image URL for the project thumbnail
          </p>
        </div>

        {imageUrl && (
          <div>
            <Label>Preview</Label>
            <div className="mt-2 rounded-lg overflow-hidden border border-border">
              <img
                src={imageUrl}
                alt="Project preview"
                className="w-full h-40 object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as typeof category)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="app">Web App</SelectItem>
                <SelectItem value="ui">UI Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="displayOrder">Display Order</Label>
            <Input
              id="displayOrder"
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
              min={0}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tech">Technologies (comma-separated)</Label>
          <Input
            id="tech"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="HTML, CSS, JavaScript, React"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : isEditing ? 'Update Project' : 'Add Project'}
        </Button>
      </div>
    </form>
  );
}
