"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./project.entity");
let ProjectsService = class ProjectsService {
    projectsRepository;
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
    }
    async create(data, ownerId) {
        const project = this.projectsRepository.create({ ...data, ownerId, status: project_entity_1.ProjectStatus.PENDING });
        return this.projectsRepository.save(project);
    }
    async findAll() {
        return this.projectsRepository.find({
            where: { status: (0, typeorm_2.In)([project_entity_1.ProjectStatus.APPROVED, project_entity_1.ProjectStatus.ACTIVE]) },
            order: { createdAt: 'DESC' },
        });
    }
    async findAllAdmin() {
        return this.projectsRepository.find({ order: { createdAt: 'DESC' } });
    }
    async findById(id) {
        const project = await this.projectsRepository.findOne({ where: { id } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
    }
    async findByOwner(ownerId) {
        return this.projectsRepository.find({ where: { ownerId }, order: { createdAt: 'DESC' } });
    }
    async approve(id) {
        const project = await this.findById(id);
        project.status = project_entity_1.ProjectStatus.ACTIVE;
        return this.projectsRepository.save(project);
    }
    async reject(id) {
        const project = await this.findById(id);
        project.status = project_entity_1.ProjectStatus.REJECTED;
        return this.projectsRepository.save(project);
    }
    async updateRaisedAmount(id, amount) {
        const project = await this.findById(id);
        project.raisedAmount = Number(project.raisedAmount) + amount;
        await this.projectsRepository.save(project);
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map