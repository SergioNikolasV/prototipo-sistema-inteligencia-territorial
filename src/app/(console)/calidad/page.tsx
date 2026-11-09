import { quality } from "@/infrastructure/composition/server"
import { QualityView } from "@/presentation/features/quality/QualityView"

export default async function QualityPage() {
  const [sources, overview, dimensions] = await Promise.all([quality.listSources(), quality.getOverview(), quality.getDimensions()])
  return <QualityView sources={sources} overview={overview} dimensions={dimensions} />
}
