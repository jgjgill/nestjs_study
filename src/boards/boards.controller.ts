import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Board } from './boards.entity'
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { PatchBoardDto } from './dto/patch-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards()
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto)
  }

  @Get(':id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id)
  }

  @Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id)
  }

  @Patch(':id/:status')
  @UsePipes(BoardStatusValidationPipe)
  updateBoardStatus(@Param() patchBoardDto: PatchBoardDto): Promise<Board> {
    return this.boardsService.updateBoardStatus(patchBoardDto)
  }
}
