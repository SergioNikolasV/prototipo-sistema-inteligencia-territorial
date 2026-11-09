import type { EtlRepository } from "../ports/etl-repository"

export const listEtlLoads = (repository: EtlRepository) => () => repository.listLoads()
export const listDatasetTypes = (repository: EtlRepository) => () => repository.listDatasetTypes()
export const processEtlFile = (repository: EtlRepository) => repository.processFile.bind(repository)
export const getEtlValidationLog = (repository: EtlRepository) => repository.getValidationLog.bind(repository)
