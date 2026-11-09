import { etl } from "@/infrastructure/composition/server"
import { EtlView } from "@/presentation/features/etl/EtlView"

export default async function EtlPage() {
  const [loads, datasetTypes] = await Promise.all([etl.listLoads(), etl.listDatasetTypes()])
  return <EtlView initialLoads={loads} datasetTypes={datasetTypes} />
}
