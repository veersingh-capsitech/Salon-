
import { Card, Col, Row } from 'antd';
export default function StatCard({
    title,
    value,
    change,
    icon,
}: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
}) {
    return (
        <Card className="rounded-2xl border border-gray-100 hover:shadow-lg">
            <Row align="middle" justify="space-between">
                <Col>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <p className="text-3xl font-semibold mt-1">{value}</p>
                    <p className="text-green-600 text-sm mt-2">{change}</p>
                </Col>
                <Col>
                    <div className="bg-blue-100 text-blue-600 px-3 py-2 rounded-xl text-xl">
                        {icon}
                    </div>
                </Col>
            </Row>
        </Card>
    );
}