import { BoardStatus } from '../boards-status.enum'

export class PatchBoardDto {
  id: string
  status: BoardStatus
}
