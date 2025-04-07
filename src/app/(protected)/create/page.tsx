"use client";
import { Input } from '@/components/ui/input';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { api } from '@/trpc/react';
import { toast } from 'sonner';
import useRefetch from '@/hooks/use-refetch';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

type FormInput = {
    repoUrl: string;
    projectName: string;
    githubToken: string;
}

const CreatePage = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>();
    const createProject = api.project.createProject.useMutation()
    const refetch = useRefetch();

    function onSubmit(data: FormInput) {
        createProject.mutate({
            githubUrl: data.repoUrl,
            name: data.projectName,
            githubToken: data.githubToken       
        }, {
            onSuccess: () => {
                toast.success("Project Created Successfully!");
                refetch()
                reset()
            },
            onError: (err) => {
                console.log(err)
                toast.error("Failed to create project. Please check your details and try again.")
            }
        })
    }

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-6rem)]'>
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Link GitHub Repository</h1>
          <p className="text-muted-foreground">
            Connect your project to start analyzing commits and pull requests
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repoUrl">GitHub Repository URL</Label>
            <Input
              {...register("repoUrl", { required: true })}
              id="repoUrl"
              placeholder="https://github.com/username/repository"
              className="rounded-lg"
            />
            <p className="text-sm text-muted-foreground">
              Example: https://github.com/yourusername/your-repo
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              {...register("projectName", { required: true })}
              id="projectName"
              placeholder="My Awesome Project"
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubToken">GitHub Token (Optional)</Label>
            <Input
              {...register("githubToken")}
              id="githubToken"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="rounded-lg"
            />
            <p className="text-sm text-muted-foreground">
              Required for private repositories. 
              <a
                href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-600 hover:underline"
              >
                How to create a token
              </a>
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full rounded-lg"
            disabled={createProject.isPending}
          >
            {createProject.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Project...
              </>
            ) : (
              'Create Project'
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default CreatePage;