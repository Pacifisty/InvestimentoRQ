import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Project, ProjectStatus } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(data: Partial<Project>, ownerId: string): Promise<Project> {
    const project = this.projectsRepository.create({ ...data, ownerId, status: ProjectStatus.PENDING });
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { status: In([ProjectStatus.APPROVED, ProjectStatus.ACTIVE]) },
      order: { createdAt: 'DESC' },
    });
  }

  async findAllAdmin(): Promise<Project[]> {
    return this.projectsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async findByOwner(ownerId: string): Promise<Project[]> {
    return this.projectsRepository.find({ where: { ownerId }, order: { createdAt: 'DESC' } });
  }

  async approve(id: string): Promise<Project> {
    const project = await this.findById(id);
    project.status = ProjectStatus.ACTIVE;
    return this.projectsRepository.save(project);
  }

  async reject(id: string): Promise<Project> {
    const project = await this.findById(id);
    project.status = ProjectStatus.REJECTED;
    return this.projectsRepository.save(project);
  }

  async updateRaisedAmount(id: string, amount: number): Promise<void> {
    const project = await this.findById(id);
    project.raisedAmount = Number(project.raisedAmount) + amount;
    await this.projectsRepository.save(project);
  }
}
