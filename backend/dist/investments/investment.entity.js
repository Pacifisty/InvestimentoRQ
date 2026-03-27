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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Investment = exports.InvestmentStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const project_entity_1 = require("../projects/project.entity");
var InvestmentStatus;
(function (InvestmentStatus) {
    InvestmentStatus["PENDING"] = "pending";
    InvestmentStatus["CONFIRMED"] = "confirmed";
})(InvestmentStatus || (exports.InvestmentStatus = InvestmentStatus = {}));
let Investment = class Investment {
    id;
    projectId;
    project;
    investorId;
    investor;
    amount;
    status;
    createdAt;
};
exports.Investment = Investment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Investment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Investment.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.investments),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_1.Project)
], Investment.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Investment.prototype, "investorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.investments),
    (0, typeorm_1.JoinColumn)({ name: 'investorId' }),
    __metadata("design:type", user_entity_1.User)
], Investment.prototype, "investor", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Investment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: InvestmentStatus.CONFIRMED }),
    __metadata("design:type", String)
], Investment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Investment.prototype, "createdAt", void 0);
exports.Investment = Investment = __decorate([
    (0, typeorm_1.Entity)()
], Investment);
//# sourceMappingURL=investment.entity.js.map