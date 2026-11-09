import type { QualityRepository } from "../ports/quality-repository"

export const listDataSources = (repository: QualityRepository) => () => repository.listSources()
export const getQualityOverview = (repository: QualityRepository) => () => repository.getOverview()
export const getQualityDimensions = (repository: QualityRepository) => () => repository.getDimensions()
export const getAuditReport = (repository: QualityRepository) => repository.getAuditReport.bind(repository)
