import { defineEventHandler } from 'h3';
import prisma from '../utils/db';

export default defineEventHandler( async () => {
  return prisma.candidate.findMany();
});
