import { z } from 'zod';

export const CreateBoard = z.object({
  title: z.string({
    required_error: 'Please enter a title',
    invalid_type_error: 'Please enter a valid title'
  }).min(3, {
    message: 'Please enter a title with at least 3 characters'
  })
})