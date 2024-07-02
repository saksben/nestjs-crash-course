import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

// REST API routing Controller
@Controller('ninjas') // Everything in this controller's routes will start with /ninjas
@UseGuards(BeltGuard) // Protect all routes that this covers
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {} // Tells Nest to automatically inject Provider into constructor
  // GET /ninjas?weapons=fast --> [] // GET request to get all ninjas
  @Get() // Tells Nest that this is a GET request. Use Query to filter by query params
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    // return [{ weapon }]; // Return mock array
    // const service = new NinjasService() // Instantiate NinjasService class and return getNinjas data request filtered by weapon
    // return service.getNinjas(weapon);
    return this.ninjasService.getNinjas(weapon);
  }

  // GET /ninjas/:id --> { ... }
  // GET request to get one ninja by its id route. Use Param to parse out id so logic can work with it. Use ParseIntPipe to turn the id string into a number
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    // return { // Before Service
    //   id,
    // };
    try {
      return this.ninjasService.getNinja(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas
  // POST request to post all ninjas
  @Post() // Tells Nest that this is a POST request. Use Body to parse out request body
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    // return { // Before Service
    //   name: createNinjaDto.name,
    // };
    return this.ninjasService.createNinja(createNinjaDto);
  }

  // PUT /ninjas/:id --> { ... }
  // PUT request to replace/update a ninja by its id route
  @Put(':id') // Tells Nest that this is a PUT request.
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    // return { // Before Service
    //   id,
    //   name: updateNinjaDto,
    // };
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  // DELETE /ninjas/:id
  // DELETE request to delete a ninja by its id route
  @Delete(':id') // Tells Nest that this is a DELETE request
  removeNinja(@Param('id') id: string) {
    // return { // Before Service
    //   id,
    // };
    return this.ninjasService.removeNinja(+id);
  }
}
