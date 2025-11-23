'use client';

import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Table,
  Tag,
  message,
} from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  RiseOutlined,
  GiftOutlined,
  PlusOutlined,
  SendOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import dayjs from 'dayjs';
import { issueCouponToUser } from '@/services/api/admin';
import { RcFile } from 'antd/es/upload';

const { Title } = Typography;
const { Option } = Select;

type CouponHistoryRow = {
  id: number;
  userId: number;
  username: string;
  templateCode: string;
  issuedAt: string;
  status: 'SUCCESS' | 'FAILED';
};

const salesData = [
  { date: '05-01', orders: 12, users: 5 },
  { date: '05-02', orders: 20, users: 8 },
  { date: '05-03', orders: 18, users: 6 },
  { date: '05-04', orders: 30, users: 12 },
  { date: '05-05', orders: 26, users: 9 },
  { date: '05-06', orders: 32, users: 11 },
  { date: '05-07', orders: 40, users: 13 },
];

const summary = {
  totalUsers: 1234,
  todayNewUsers: 12,
  totalOrders: 987,
  todayOrders: 34,
  totalSales: 12500000,
  issuedCoupons: 432,
};

const initialCouponHistory: CouponHistoryRow[] = [
  {
    id: 1,
    userId: 2,
    username: 'fashion_lover1',
    templateCode: 'WELCOME_3000',
    issuedAt: dayjs().subtract(2, 'hour').toISOString(),
    status: 'SUCCESS',
  },
];

export default function DashboardSection() {
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);

  const [templateForm] = Form.useForm();
  const [issueForm] = Form.useForm();

  const [couponHistory, setCouponHistory] =
    useState<CouponHistoryRow[]>(initialCouponHistory);

  const [uploadList, setUploadList] = useState<RcFile[]>([]);

  const handleTemplateCreate = async () => {
    const values = await templateForm.validateFields();
    console.log('템플릿 생성 값:', values);
    setTemplateModalOpen(false);
    templateForm.resetFields();
    setUploadList([]);
    message.success('쿠폰 템플릿이 생성되었습니다.');
  };

  const handleIssueCoupon = async () => {
    try {
      const values = await issueForm.validateFields();
      const userId = Number(values.userId);
      const templateCode = values.templateCode.trim();

      await issueCouponToUser({ templateCode, userId });

      const newRow: CouponHistoryRow = {
        id: couponHistory.length
          ? couponHistory[couponHistory.length - 1].id + 1
          : 1,
        userId,
        username: values.username || `user_${userId}`,
        templateCode,
        issuedAt: dayjs().toISOString(),
        status: 'SUCCESS',
      };

      setCouponHistory((prev) => [newRow, ...prev]);
      message.success('쿠폰이 발급되었습니다.');

      issueForm.resetFields();
      setIssueModalOpen(false);
    } catch {
      message.error('발급 실패');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 헤더 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          관리자 대시보드
        </Title>

        <Space>
          <Button icon={<PlusOutlined />} onClick={() => setTemplateModalOpen(true)}>
            쿠폰 템플릿 생성
          </Button>
          <Button type="primary" icon={<SendOutlined />} onClick={() => setIssueModalOpen(true)}>
            쿠폰 발급
          </Button>
        </Space>
      </div>

      {/* KPI 카드 */}
      <Row gutter={16}>
        <Col xs={24} md={6}>
          <Card>
            <Statistic title="총 사용자 수" value={summary.totalUsers} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Statistic title="총 주문 수" value={summary.totalOrders} prefix={<ShoppingCartOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Statistic title="누적 결제 금액" value={summary.totalSales} prefix={<RiseOutlined />} suffix="원" />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Statistic title="발급된 쿠폰 수" value={summary.issuedCoupons} prefix={<GiftOutlined />} />
          </Card>
        </Col>
      </Row>

      {/* 차트 */}
      <Card>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RTooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" strokeWidth={2} name="주문" dot={false} />
              <Line type="monotone" dataKey="users" strokeWidth={2} name="신규 사용자" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 발급 이력 */}
      <Card title="최근 쿠폰 발급 이력">
        <Table<CouponHistoryRow>
          rowKey="id"
          size="small"
          pagination={{ pageSize: 5 }}
          dataSource={couponHistory}
          columns={[
            { title: 'ID', dataIndex: 'id', width: 60 },
            { title: '사용자 ID', dataIndex: 'userId', width: 80 },
            { title: '사용자명', dataIndex: 'username' },
            { title: '코드', dataIndex: 'templateCode' },
            {
              title: '발급 시간',
              dataIndex: 'issuedAt',
              width: 160,
              render: (v: string) => dayjs(v).format('YYYY-MM-DD HH:mm'),
            },
            {
              title: '상태',
              dataIndex: 'status',
              width: 100,
              render: (v: CouponHistoryRow['status']) => (
                <Tag color={v === 'SUCCESS' ? 'green' : 'volcano'}>{v}</Tag>
              ),
            },
          ]}
        />
      </Card>

      {/* 템플릿 생성 모달 */}
      <Modal
        title="쿠폰 템플릿 생성"
        open={templateModalOpen}
        onCancel={() => setTemplateModalOpen(false)}
        onOk={handleTemplateCreate}
        okText="생성"
      >
        <Form form={templateForm} layout="vertical">
          <Form.Item label="쿠폰명" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="코드" name="code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="할인 방식" name="discountType" initialValue="FIXED">
            <Select>
              <Option value="FIXED">정액</Option>
              <Option value="PERCENT">정률</Option>
            </Select>
          </Form.Item>

          <Form.Item label="할인 값" name="discountValue" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="최대 할인금액 (정률)" name="maxDiscount">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="최소 주문금액" name="minOrderAmount">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="성별" name="targetGender" initialValue="A">
            <Select>
              <Option value="A">전체</Option>
              <Option value="M">남성</Option>
              <Option value="F">여성</Option>
            </Select>
          </Form.Item>

          <Form.Item label="카테고리 코드" name="categoryCode">
            <Input />
          </Form.Item>

          <Form.Item label="유효기간(일)" name="validDaysAfterIssue">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="이미지 업로드">
            <Upload
              beforeUpload={(file) => {
                setUploadList([...uploadList, file]);
                return false;
              }}
              fileList={uploadList}
              onRemove={(file) => {
                setUploadList(uploadList.filter((f) => f.uid !== file.uid));
              }}
            >
              <Button icon={<UploadOutlined />}>이미지 추가</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* 쿠폰 발급 모달 */}
      <Modal
        title="쿠폰 발급"
        open={issueModalOpen}
        onCancel={() => setIssueModalOpen(false)}
        onOk={issueForm.submit}
        okText="발급"
      >
        <Form form={issueForm} layout="vertical" onFinish={handleIssueCoupon}>
          <Form.Item label="사용자 ID" name="userId" rules={[{ required: true }]}>
            <Input placeholder="2" />
          </Form.Item>

          <Form.Item label="사용자명" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="템플릿 코드" name="templateCode" rules={[{ required: true }]}>
            <Input placeholder="WELCOME_3000" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
