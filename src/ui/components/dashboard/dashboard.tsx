'use client';

import React, { useMemo, useState } from 'react';
import {
  Layout,
  Menu,
  Card,
  Statistic,
  Table,
  Tag,
  Typography,
  Divider,
  Space,
  Button,
  Tooltip,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Switch,
  message,
  Upload,
} from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
  GiftOutlined,
  PlusOutlined,
  ReloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
} from 'recharts';
import { createCouponTemplate, issueCouponToUser } from '@/services/api/admin';
import { uploadImages } from '@/services/api/imageUpload';
import { genderOptions, categories, subCategories } from '@/data/categories';

const { Sider, Header, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

type Order = {
  id: number;
  buyer: string;
  seller: string;
  status: 'PAID' | 'PENDING' | 'CANCELLED' | 'REFUNDED';
  total: number;
  createdAt: string;
};

type CouponRow = {
  id: number;
  name: string;
  code: string;
  discount: string;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  issued: number;
  used: number;
  validUntil: string;
};

export default function DashBoardForm() {
  const stats = useMemo(
    () => ({
      salesToday: 1845000,
      ordersToday: 87,
      totalUsers: 12430,
      activeCoupons: 6,
    }),
    []
  );

  const visits = useMemo(
    () => [
      { date: '11-01', page: 1, user: 1 },
      { date: '11-02', page: 2, user: 1 },
      { date: '11-03', page: 3, user: 2 },
      { date: '11-04', page: 8, user: 4 },
      { date: '11-05', page: 6, user: 3 },
      { date: '11-06', page: 10, user: 5 },
    ],
    []
  );

  const recentOrders: Order[] = useMemo(
    () => [
      { id: 10122, buyer: 'kimsh**', seller: 'fitloop_official', status: 'PAID', total: 59000, createdAt: '2025-11-06 10:12' },
      { id: 10121, buyer: 'leejh**', seller: 'vintage_store', status: 'PENDING', total: 32000, createdAt: '2025-11-06 10:07' },
      { id: 10120, buyer: 'parkdh**', seller: 'street99', status: 'PAID', total: 129000, createdAt: '2025-11-06 09:58' },
      { id: 10119, buyer: 'yuna**', seller: 'fitloop_official', status: 'CANCELLED', total: 45000, createdAt: '2025-11-06 09:51' },
      { id: 10118, buyer: 'minji**', seller: 'classic_apt', status: 'REFUNDED', total: 77000, createdAt: '2025-11-06 09:40' },
    ],
    []
  );

  const couponOverview: CouponRow[] = useMemo(
    () => [
      { id: 11, name: 'WELCOME 3,000', code: 'WELCOME_3000', discount: '3,000원 고정', status: 'ACTIVE', issued: 1320, used: 487, validUntil: '상시' },
      { id: 12, name: '11월 셀러전 10%', code: 'NOV_SELLER_10', discount: '10% (최대 5,000원)', status: 'ACTIVE', issued: 420, used: 112, validUntil: '2025-11-30' },
      { id: 13, name: '룩북 전용 2,000', code: 'LOOKBOOK_2000', discount: '2,000원 고정', status: 'PAUSED', issued: 280, used: 53, validUntil: '2025-12-31' },
    ],
    []
  );

  const orderColumns = [
    { title: '주문번호', dataIndex: 'id', key: 'id', width: 100, render: (v: number) => `#${v}` },
    { title: '구매자', dataIndex: 'buyer', key: 'buyer', width: 140 },
    { title: '판매자', dataIndex: 'seller', key: 'seller', width: 160 },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (s: Order['status']) => {
        const map: Record<Order['status'], { color: string; label: string }> = {
          PAID: { color: 'green', label: '결제완료' },
          PENDING: { color: 'gold', label: '결제대기' },
          CANCELLED: { color: 'red', label: '취소' },
          REFUNDED: { color: 'volcano', label: '환불' },
        };
        const { color, label } = map[s];
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: '총액',
      dataIndex: 'total',
      key: 'total',
      width: 120,
      align: 'right' as const,
      render: (v: number) => v.toLocaleString('ko-KR') + '원',
    },
    { title: '주문시간', dataIndex: 'createdAt', key: 'createdAt', width: 160 },
  ];

  const couponColumns = [
    { title: '이름', dataIndex: 'name', key: 'name' },
    { title: '코드', dataIndex: 'code', key: 'code', width: 180 },
    { title: '할인', dataIndex: 'discount', key: 'discount', width: 160 },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (s: CouponRow['status']) => {
        const map: Record<CouponRow['status'], { color: string; label: string }> = {
          ACTIVE: { color: 'green', label: '활성' },
          PAUSED: { color: 'gold', label: '일시중지' },
          ARCHIVED: { color: 'default', label: '보관' },
        };
        const { color, label } = map[s];
        return <Tag color={color}>{label}</Tag>;
      },
    },
    { title: '발급', dataIndex: 'issued', key: 'issued', width: 100 },
    { title: '사용', dataIndex: 'used', key: 'used', width: 100 },
    { title: '유효기간', dataIndex: 'validUntil', key: 'validUntil', width: 140 },
  ];

  const [createOpen, setCreateOpen] = useState(false);
  const [issueOpen, setIssueOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [issueLoading, setIssueLoading] = useState(false);
  const [form] = Form.useForm();
  const [issueForm] = Form.useForm();

  const [fileList, setFileList] = useState<any[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const [selectedGender, setSelectedGender] = useState<'A' | 'M' | 'F'>('A');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [selectedSubCode, setSelectedSubCode] = useState<string | undefined>(undefined);

  const handleCreateCoupon = async () => {
    try {
      const values = await form.validateFields();
      setCreateLoading(true);

      let imageUrls: string[] = uploadedUrls;
      if (fileList.length > 0) {
        const files = fileList.map((f) => f.originFileObj as File).filter(Boolean);
        if (files.length > 0) {
          imageUrls = await uploadImages(files);
          setUploadedUrls(imageUrls);
        }
      }

      const validFrom = values.validRange?.[0] ? (values.validRange[0] as dayjs.Dayjs).toDate().toISOString() : null;
      const validUntil = values.validRange?.[1] ? (values.validRange[1] as dayjs.Dayjs).toDate().toISOString() : null;

      let targetIdsCsv = values.targetIds ?? '';
      if (values.targetType === 'CATEGORY') {
        if (!selectedCategoryId) throw new Error('카테고리를 선택하세요.');
        const subCode = selectedSubCode ?? '000';
        const gender = selectedGender ?? 'A';
        targetIdsCsv = `${selectedCategoryId}:${subCode}:${gender}`;
      }

      await createCouponTemplate({
        name: values.name,
        code: values.code,
        discountType: values.discountType,
        discountValue: values.discountValue,
        maxDiscount: values.maxDiscount ?? null,
        minOrderAmount: values.minOrderAmount ?? 0,
        validFrom,
        validUntil,
        validDaysAfterIssue: values.validDaysAfterIssue ?? null,
        stackable: values.stackable ?? false,
        targetType: values.targetType,
        targetIdsCsv,
        status: 'ACTIVE',
        imageUrls,
      });

      message.success('쿠폰 템플릿이 생성되었습니다.');
      setCreateOpen(false);
      form.resetFields();
      setFileList([]);
      setUploadedUrls([]);
      setSelectedCategoryId(undefined);
      setSelectedSubCode(undefined);
      setSelectedGender('A');
    } catch (err) {
      message.error(err instanceof Error ? err.message : '쿠폰 생성에 실패했습니다.');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleIssueCoupon = async () => {
    try {
      const values = await issueForm.validateFields();
      setIssueLoading(true);
      await issueCouponToUser({
        templateCode: values.templateCode,
        userId: values.userId,
      });
      message.success('해당 사용자에게 쿠폰이 발급되었습니다.');
      setIssueOpen(false);
      issueForm.resetFields();
    } catch (err) {
      message.error(err instanceof Error ? err.message : '쿠폰 발급에 실패했습니다.');
    } finally {
      setIssueLoading(false);
    }
  };

  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Sider width={220} theme="dark">
        <div className="h-16 flex items-center px-4 text-white font-semibold text-lg">Fitloop Admin</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={[
            { key: 'dashboard', icon: <HomeOutlined />, label: '대시보드' },
            { key: 'users', icon: <UserOutlined />, label: '사용자 관리' },
            { key: 'orders', icon: <ShoppingCartOutlined />, label: '주문 관리' },
            { key: 'stats', icon: <BarChartOutlined />, label: '통계' },
            { key: 'settings', icon: <SettingOutlined />, label: '환경설정' },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            height: 64,
            background: '#fff',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #eef0f2',
          }}
        >
          <Title level={4} className="!m-0">대시보드</Title>
          <Space>
            <Tooltip title="새로고침">
              <Button icon={<ReloadOutlined />} onClick={() => location.reload()} />
            </Tooltip>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateOpen(true)}>
              새 쿠폰 만들기
            </Button>
            <Button icon={<GiftOutlined />} onClick={() => setIssueOpen(true)}>
              쿠폰 발급
            </Button>
          </Space>
        </Header>

        <Content style={{ padding: 16, overflow: 'auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
            <Card>
              <Statistic title="오늘 매출" value={stats.salesToday} suffix="원" valueStyle={{ color: '#3f8600' }} />
            </Card>
            <Card>
              <Statistic title="오늘 주문 수" value={stats.ordersToday} valueStyle={{ color: '#1890ff' }} />
            </Card>
            <Card>
              <Statistic title="총 가입자" value={stats.totalUsers} valueStyle={{ color: '#722ed1' }} />
            </Card>
            <Card>
              <Statistic title="활성 쿠폰" value={stats.activeCoupons} valueStyle={{ color: '#fa8c16' }} />
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <Card className="xl:col-span-2" title="방문자 요약">
              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer>
                  <LineChart data={visits} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RTooltip />
                    <Line type="monotone" dataKey="page" />
                    <Line type="monotone" dataKey="user" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="사이트 요약">
              <Space direction="vertical" size={8} className="w-full">
                <div className="flex justify-between"><Text>오늘 신규회원</Text><Text strong>0</Text></div>
                <div className="flex justify-between"><Text>오늘 방문자</Text><Text strong>0</Text></div>
                <div className="flex justify-between"><Text>오늘 트래픽</Text><Text type="secondary">데이터 수집 준비 중</Text></div>
                <div className="flex justify-between"><Text>주간 평균 방문자</Text><Text strong>0</Text></div>
                <div className="flex justify-between"><Text>사용 공간</Text><Text type="secondary">데이터 준비 중</Text></div>
              </Space>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
            <Card title="오늘의 알림" extra={<Tag color="red">1</Tag>}>
              <Space direction="vertical">
                <Text>신규문의 1건</Text>
                <Text type="secondary">체크요청 0 / 입금대기 0 / 예약확정 0 / 취소요청 0</Text>
              </Space>
            </Card>

            <Card className="xl:col-span-2" title="최근 주문">
              <Table
                columns={orderColumns}
                dataSource={recentOrders}
                pagination={{ pageSize: 5 }}
                size="middle"
                rowKey="id"
              />
            </Card>
          </div>

          <div className="mt-4">
            <Card title="쿠폰 개요">
              <Table
                columns={couponColumns}
                dataSource={couponOverview}
                pagination={false}
                size="middle"
                rowKey="id"
              />
            </Card>
          </div>

          <Divider />
          <Text type="secondary">© 2025 Fitloop Admin Dashboard</Text>
        </Content>
      </Layout>

      <Modal
        title="새 쿠폰 만들기"
        open={createOpen}
        onOk={handleCreateCoupon}
        onCancel={() => setCreateOpen(false)}
        confirmLoading={createLoading}
        okText="생성"
        cancelText="취소"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="쿠폰 이름" rules={[{ required: true }]}>
            <Input placeholder="예) 빵순이들에게만 주는 쿠폰" />
          </Form.Item>
          <Form.Item name="code" label="코드(식별용)" rules={[{ required: true }]}>
            <Input placeholder="예) QNDFSCRWSD" />
          </Form.Item>

          <Form.Item name="discountType" label="할인 유형" initialValue="FIXED" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'FIXED', label: '고정 금액' },
                { value: 'PERCENT', label: '비율(%)' },
              ]}
            />
          </Form.Item>

          <Form.Item noStyle shouldUpdate>
            {() => (
              <Form.Item
                name="discountValue"
                label={form.getFieldValue('discountType') === 'PERCENT' ? '할인율(%)' : '할인 금액(원)'}
                rules={[{ required: true }]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            )}
          </Form.Item>

          <Form.Item name="maxDiscount" label="최대 할인금액(원, 비율형일 때)">
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item name="minOrderAmount" label="최소 주문금액(원)" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="유효기간(시작~종료)" name="validRange">
            <RangePicker className="w-full" showTime />
          </Form.Item>

          <Form.Item name="validDaysAfterIssue" label="발급 후 유효일수">
            <InputNumber min={1} className="w-full" placeholder="예) 14" />
          </Form.Item>

          <Form.Item name="stackable" label="다른 쿠폰과 중복 사용" valuePropName="checked" initialValue={false}>
            <Switch />
          </Form.Item>

          <Form.Item name="targetType" label="적용 대상" initialValue="ALL" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'ALL', label: '전체' },
                { value: 'SELLER', label: '특정 유저' },
                { value: 'PRODUCT', label: '특정 상품' },
                { value: 'CATEGORY', label: '특정 카테고리' },
              ]}
              onChange={(v: string) => {
                if (v !== 'CATEGORY') {
                  setSelectedCategoryId(undefined);
                  setSelectedSubCode(undefined);
                  setSelectedGender('A');
                }
              }}
            />
          </Form.Item>

          <Form.Item noStyle shouldUpdate>
            {() =>
              form.getFieldValue('targetType') === 'CATEGORY' ? (
                <>
                  <Form.Item label="카테고리" required>
                    <Select
                      placeholder="대분류 선택"
                      value={selectedCategoryId}
                      onChange={(v) => {
                        setSelectedCategoryId(v);
                        setSelectedSubCode(undefined);
                      }}
                      options={categories.map((c) => ({ label: c.name, value: c.id }))}
                    />
                  </Form.Item>

                  <Form.Item label="중분류">
                    <Select
                      placeholder="중분류 선택"
                      value={selectedSubCode}
                      onChange={(v) => setSelectedSubCode(v)}
                      options={(selectedCategoryId ? subCategories[selectedCategoryId] : [{ name: '전체', code: '000' }]).map(
                        (s) => ({ label: s.name, value: s.code })
                      )}
                    />
                  </Form.Item>

                  <Form.Item label="성별">
                    <Select
                      value={selectedGender}
                      onChange={(v) => setSelectedGender(v)}
                      options={genderOptions}
                    />
                  </Form.Item>
                </>
              ) : null
            }
          </Form.Item>

          <Form.Item name="targetIds" label="대상 ID 목록(CSV)">
            <Input placeholder="SELLER/PRODUCT일 때: 예) 10,22,35" />
          </Form.Item>

          <Form.Item label="쿠폰 이미지">
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList: fl }) => setFileList(fl)}
              onRemove={(file) => {
                setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
              }}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>업로드</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="쿠폰 발급(개별 사용자)"
        open={issueOpen}
        onOk={handleIssueCoupon}
        onCancel={() => setIssueOpen(false)}
        confirmLoading={issueLoading}
        okText="발급"
        cancelText="취소"
      >
        <Form form={issueForm} layout="vertical">
          <Form.Item name="templateCode" label="템플릿 코드" rules={[{ required: true }]}>
            <Input placeholder="예) WELCOME_3000" />
          </Form.Item>
          <Form.Item name="userId" label="사용자 ID" rules={[{ required: true }]}>
            <InputNumber min={1} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}
