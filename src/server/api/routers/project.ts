import { pollCommits } from "@/lib/github";
import { protectedProcedure, publicProcedure } from "../trpc";
import { createTRPCRouter } from "../trpc";
import { z } from "zod";
import { indexGithubRepo } from "@/lib/github-loader";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                githubUrl: z.string(),
                githubToken: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.userId) {
                throw new Error("User ID is required");
            }
            const project = await ctx.db.project.create({
                data: {
                    githubUrl: input.githubUrl,
                    name: input.name,
                    userToProject: {
                        create: {
                            userId: ctx.user.userId,
                        }
                    }
                }
            });
            await indexGithubRepo(project.id, input.githubUrl, input.githubToken);
            await pollCommits(project.id);
            return project;
        }),

        getProjects: protectedProcedure.query(async({ctx})=>{
            if (!ctx.user.userId) {
                throw new Error("User ID is required");
            }
            return await ctx.db.project.findMany({
                where:{
                    userToProject:{
                        some:{
                            userId: ctx.user.userId
                        }
                    },
                    deletedAt: null
                }
            })
        }),

        getCommits: protectedProcedure.input(z.object({
            projectId: z.string(),
        })).query(async({ctx, input})=>{
            return await ctx.db.commit.findMany({
                where:{
                    projectId: input.projectId,
                   
                }
        })

        }),
        deleteProject: protectedProcedure
  .input(z.object({ projectId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    if (!ctx.user.userId) {
      throw new Error("User ID is required");
    }
    
    // Soft delete
    return await ctx.db.project.update({
      where: {
        id: input.projectId,
        userToProject: {
          some: {
            userId: ctx.user.userId
          }
        }
      },
      data: {
        deletedAt: new Date()
      }
    });
  }),

});