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
exports.InvestmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const investment_entity_1 = require("./investment.entity");
const projects_service_1 = require("../projects/projects.service");
let InvestmentsService = class InvestmentsService {
    investmentsRepository;
    projectsService;
    constructor(investmentsRepository, projectsService) {
        this.investmentsRepository = investmentsRepository;
        this.projectsService = projectsService;
    }
    async create(projectId, investorId, amount) {
        await this.projectsService.findById(projectId);
        const investment = this.investmentsRepository.create({
            projectId,
            investorId,
            amount,
            status: investment_entity_1.InvestmentStatus.CONFIRMED,
        });
        const saved = await this.investmentsRepository.save(investment);
        await this.projectsService.updateRaisedAmount(projectId, amount);
        return saved;
    }
    async findByInvestor(investorId) {
        return this.investmentsRepository.find({
            where: { investorId },
            relations: ['project'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByProject(projectId) {
        return this.investmentsRepository.find({
            where: { projectId },
            relations: ['investor'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.InvestmentsService = InvestmentsService;
exports.InvestmentsService = InvestmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(investment_entity_1.Investment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        projects_service_1.ProjectsService])
], InvestmentsService);
//# sourceMappingURL=investments.service.js.map