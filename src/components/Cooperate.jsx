import React from 'react';
import { Typography, Card } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Cooperate = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-50 p-10">
            {/* Header */}
            <div className="text-center mb-12">
                <Title level={2} className="text-blue-800">
                    Cooperate with Us
                </Title>
                <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                    We are always looking for partners to build a community that cares about mental health. Let’s create positive value for society together!
                </Paragraph>
            </div>

            {/* Introduction */}
            <div className="mb-12">
                <Card className="shadow-md rounded-xl max-w-4xl mx-auto p-6">
                    <Title level={3} className="text-blue-700 mb-4">
                        About Us
                    </Title>
                    <Paragraph className="text-gray-600">
                        Our platform is a mental health support system that connects users with psychologists through consultation bookings, medical report storage, and mental health assessments. We are committed to providing the best support for the mental well-being of our community.
                    </Paragraph>
                    <Paragraph className="text-gray-600">
                        We are eager to collaborate with organizations, businesses, and individuals to expand our services, organize mental health events, or integrate new technological solutions.
                    </Paragraph>
                </Card>
            </div>

            {/* Benefits of Cooperation */}
            <div className="mb-12">
                <Title level={3} className="text-center text-blue-700 mb-8">
                    Benefits of Cooperation
                </Title>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <Card className="shadow-md rounded-xl p-4 text-center">
                        <Title level={4} className="text-blue-600">
                            Expand Your Services
                        </Title>
                        <Paragraph className="text-gray-600">
                            Partner with us to bring your services closer to a community that cares about mental health.
                        </Paragraph>
                    </Card>
                    <Card className="shadow-md rounded-xl p-4 text-center">
                        <Title level={4} className="text-blue-600">
                            Enhance Your Reputation
                        </Title>
                        <Paragraph className="text-gray-600">
                            Collaborate with a professional, trusted platform to elevate your brand image.
                        </Paragraph>
                    </Card>
                    <Card className="shadow-md rounded-xl p-4 text-center">
                        <Title level={4} className="text-blue-600">
                            Create Social Value
                        </Title>
                        <Paragraph className="text-gray-600">
                            Join us in organizing events and campaigns to raise awareness about mental health.
                        </Paragraph>
                    </Card>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-600">
                <Paragraph>
                    <MailOutlined className="mr-2" /> Email: support@mentalhealthapp.com
                </Paragraph>
                <Paragraph>
                    <PhoneOutlined className="mr-2" /> Phone: +84 123 456 789
                </Paragraph>
                <Paragraph>
                    <EnvironmentOutlined className="mr-2" /> Address: 123 Mental Health Road, Ho Chi Minh City, Vietnam
                </Paragraph>
            </div>
        </div>
    );
};

export default Cooperate;