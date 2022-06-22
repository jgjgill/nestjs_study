import { Injectable, NotFoundException } from '@nestjs/common'
import { BoardStatus } from './boards-status.enum'
import { v1 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create-board.dto'
import { PatchBoardDto } from './dto/patch-board.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './boards.entity'
import { Repository } from 'typeorm'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}
  // getAllBoards(): Board[] {
  //   return this.boards
  // }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    })

    await this.boardRepository.save(board)

    return board
  }

  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   }
  //   this.boards.push(board)
  //   return board
  // }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id)

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }

    return found
  }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id)
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`)
  //   }
  //   return found
  // }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id)
  //   this.boards = this.boards.filter((board) => board.id !== found.id)
  // }
  // updateBoardStatus(patchBoardDto: PatchBoardDto): Board {
  //   const { id, status } = patchBoardDto
  //   const board = this.getBoardById(id)
  //   board.status = status
  //   return board
  // }
}
