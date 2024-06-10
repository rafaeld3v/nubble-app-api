import { inject, injectable } from 'tsyringe'

import { IPostCommentReaction } from '../../Interfaces/IPostCommentReaction'

@injectable()
export class DeletePostCommentReactionService {
  constructor(
    @inject('PostCommentReactionRepository')
    private postCommentReactionRepository: IPostCommentReaction.Repository
  ) {}

  public async run(commentId: number, userId: number): Promise<boolean> {
    try {
      await this.postCommentReactionRepository.deleteFromComment(commentId, userId)

      return true
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
