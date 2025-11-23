'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Typography,
  Space,
  Button,
  Input,
  Select,
  DatePicker,
  Divider,
  Popconfirm,
  message,
  Drawer,
  Descriptions,
  Tooltip,
} from 'antd';
import type {
  ColumnsType,
} from 'antd/es/table';
import type {
  TablePaginationConfig,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import {
  UserOutlined,
  ReloadOutlined,
  SearchOutlined,
  StopOutlined,
  CheckCircleOutlined,
  CrownOutlined,
  GiftOutlined,
  ExportOutlined,
  EditOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

type UserRole = 'ADMIN' | 'MEMBER';
type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';
let order: 'asc' | 'desc' | undefined;

export type UserRow = {
  id: number;
  username: string;
  nickname?: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLoginAt?: string;
  ordersCount?: number;
  spentTotal?: number;
};

type Query = {
  q?: string;
  role?: UserRole | 'ALL';
  status?: UserStatus | 'ALL';
  joinedRange?: [string, string] | null;
  page: number;
  pageSize: number;
  sort?: string;
};

const roleColors: Record<UserRole, string> = {
  ADMIN: 'purple',
  MEMBER: 'default',
};

const statusColors: Record<UserStatus, string> = {
  ACTIVE: 'green',
  SUSPENDED: 'volcano',
  DELETED: 'default',
};

let mockDb: UserRow[] = [
  {
    id: 1,
    email: 'admin01@fitloop.com',
    username: 'admin_master',
    nickname: '빵순이',
    phone: '010-1234-0001',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2025-04-05T07:00:30.000Z',
    lastLoginAt: dayjs('2025-04-10T09:12:00.000Z').toISOString(),
    ordersCount: 0,
    spentTotal: 0,
  },
  {
    id: 2,
    email: 'member01@fitloop.com',
    username: 'fashion_lover1',
    nickname: '패션러버',
    phone: '010-5555-1111',
    role: 'MEMBER',
    status: 'ACTIVE',
    createdAt: '2025-04-06T11:20:00.000Z',
    lastLoginAt: dayjs('2025-04-11T14:03:00.000Z').toISOString(),
    ordersCount: 3,
    spentTotal: 45000,
  },
  {
    id: 3,
    email: 'member02@fitloop.com',
    username: 'street_casual',
    nickname: '스트릿캐주얼',
    phone: '010-5555-2222',
    role: 'MEMBER',
    status: 'ACTIVE',
    createdAt: '2025-04-07T08:45:00.000Z',
    lastLoginAt: dayjs('2025-04-12T19:30:00.000Z').toISOString(),
    ordersCount: 5,
    spentTotal: 98000,
  },
  {
    id: 4,
    email: 'member03@fitloop.com',
    username: 'minimalist',
    nickname: '미니멀유저',
    phone: '010-5555-3333',
    role: 'MEMBER',
    status: 'SUSPENDED',
    createdAt: '2025-04-08T13:10:00.000Z',
    lastLoginAt: dayjs('2025-04-13T21:15:00.000Z').toISOString(),
    ordersCount: 1,
    spentTotal: 12000,
  },
];

function applySearchFilterSortPagination(query: Query): { items: UserRow[]; total: number } {
  let data = [...mockDb];

  if (query.q && query.q.trim() !== '') {
    const q = query.q.trim().toLowerCase();
    data = data.filter((u) => {
      return (
        u.username.toLowerCase().includes(q) ||
        (u.nickname && u.nickname.toLowerCase().includes(q)) ||
        u.email.toLowerCase().includes(q)
      );
    });
  }

  if (query.role && query.role !== 'ALL') {
    data = data.filter((u) => u.role === query.role);
  }

  if (query.status && query.status !== 'ALL') {
    data = data.filter((u) => u.status === query.status);
  }

  if (query.joinedRange) {
    const [from, to] = query.joinedRange;
    const fromTime = new Date(from).getTime();
    const toTime = new Date(to).getTime();
    data = data.filter((u) => {
      const t = new Date(u.createdAt).getTime();
      return t >= fromTime && t <= toTime;
    });
  }

  if (query.sort) {
    const [field, order] = query.sort.split(':') as [keyof UserRow, 'asc' | 'desc'];
    data.sort((a, b) => {
      const av = a[field];
      const bv = b[field];
      if (av == null && bv == null) return 0;
      if (av == null) return order === 'asc' ? -1 : 1;
      if (bv == null) return order === 'asc' ? 1 : -1;
      if (typeof av === 'number' && typeof bv === 'number') {
        return order === 'asc' ? av - bv : bv - av;
      }
      const as = String(av);
      const bs = String(bv);
      return order === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as);
    });
  }

  const total = data.length;
  const start = (query.page - 1) * query.pageSize;
  const end = start + query.pageSize;
  const items = data.slice(start, end);

  return { items, total };
}

async function mockGetUsers(query: Query): Promise<{ items: UserRow[]; total: number }> {
  await new Promise((r) => setTimeout(r, 300));
  return applySearchFilterSortPagination(query);
}

async function mockBulkSuspendUsers(ids: number[]): Promise<void> {
  mockDb = mockDb.map((u) =>
    ids.includes(u.id) ? { ...u, status: 'SUSPENDED' as UserStatus } : u
  );
  await new Promise((r) => setTimeout(r, 200));
}

async function mockBulkActivateUsers(ids: number[]): Promise<void> {
  mockDb = mockDb.map((u) =>
    ids.includes(u.id) ? { ...u, status: 'ACTIVE' as UserStatus } : u
  );
  await new Promise((r) => setTimeout(r, 200));
}

async function mockSoftDeleteUser(id: number): Promise<void> {
  mockDb = mockDb.map((u) =>
    u.id === id ? { ...u, status: 'DELETED' as UserStatus } : u
  );
  await new Promise((r) => setTimeout(r, 200));
}

async function mockUpdateUserRole(id: number, role: UserRole): Promise<void> {
  mockDb = mockDb.map((u) => (u.id === id ? { ...u, role } : u));
  await new Promise((r) => setTimeout(r, 200));
}

async function mockIssueCouponToUser(params: { templateCode: string; userId: number }) {
  console.log('issue coupon mock', params);
  await new Promise((r) => setTimeout(r, 200));
}

export default function UsersSection() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [current, setCurrent] = useState<UserRow | null>(null);

  const [query, setQuery] = useState<Query>({
    q: '',
    role: 'ALL',
    status: 'ALL',
    joinedRange: null,
    page: 1,
    pageSize: 10,
    sort: 'createdAt:desc',
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await mockGetUsers(query);
      setRows(res.items);
      setTotal(res.total);
    } catch {
      message.error('사용자 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns: ColumnsType<UserRow> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 90,
        sorter: true,
      },
      {
        title: '계정',
        key: 'account',
        render: (_, r) => (
          <Space direction="vertical" size={0}>
            <Space>
              <UserOutlined />
              <Text strong>{r.username}</Text>
              {r.nickname ? <Text type="secondary">({r.nickname})</Text> : null}
            </Space>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {r.email}
              {r.phone ? ` · ${r.phone}` : ''}
            </Text>
          </Space>
        ),
      },
      {
        title: '역할',
        dataIndex: 'role',
        width: 110,
        filters: [
          { text: 'ADMIN', value: 'ADMIN' },
          { text: 'MEMBER', value: 'MEMBER' },
        ],
        render: (v: UserRole) => <Tag color={roleColors[v]}>{v}</Tag>,
      },
      {
        title: '상태',
        dataIndex: 'status',
        width: 120,
        filters: [
          { text: 'ACTIVE', value: 'ACTIVE' },
          { text: 'SUSPENDED', value: 'SUSPENDED' },
          { text: 'DELETED', value: 'DELETED' },
        ],
        render: (s: UserStatus) => <Tag color={statusColors[s]}>{s}</Tag>,
      },
      {
        title: '누적 주문',
        dataIndex: 'ordersCount',
        width: 110,
      },
      {
        title: '누적 결제',
        dataIndex: 'spentTotal',
        width: 130,
        render: (v?: number) => (v ? `${v.toLocaleString('ko-KR')}원` : '-'),
      },
      {
        title: '가입일',
        dataIndex: 'createdAt',
        width: 160,
        sorter: true,
        render: (iso: string) => dayjs(iso).format('YYYY-MM-DD HH:mm'),
      },
      {
        title: '최근 로그인',
        dataIndex: 'lastLoginAt',
        width: 160,
        render: (iso?: string) => (iso ? dayjs(iso).format('YYYY-MM-DD HH:mm') : '-'),
      },
      {
        title: '작업',
        key: 'actions',
        fixed: 'right',
        width: 280,
        render: (_, r) => (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setCurrent(r);
                setDrawerOpen(true);
              }}
            >
              상세
            </Button>

            {r.status !== 'SUSPENDED' ? (
              <Popconfirm
                title="정지 처리하시겠습니까?"
                onConfirm={async () => {
                  await mockBulkSuspendUsers([r.id]);
                  message.success('정지되었습니다.');
                  fetchData();
                }}
              >
                <Button danger icon={<StopOutlined />}>
                  정지
                </Button>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="정지 해제하시겠습니까?"
                onConfirm={async () => {
                  await mockBulkActivateUsers([r.id]);
                  message.success('활성화되었습니다.');
                  fetchData();
                }}
              >
                <Button icon={<CheckCircleOutlined />}>해제</Button>
              </Popconfirm>
            )}

            <Tooltip title="쿠폰 발급">
              <Button
                icon={<GiftOutlined />}
                onClick={async () => {
                  const templateCode = prompt('템플릿 코드 입력 (예: WELCOME_3000)');
                  if (!templateCode) return;
                  try {
                    await mockIssueCouponToUser({ templateCode, userId: r.id });
                    message.success('쿠폰 발급 완료');
                  } catch {
                    message.error('쿠폰 발급 실패');
                  }
                }}
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    [fetchData]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  const exportCSV = () => {
    const header =
      'id,username,nickname,email,phone,role,status,ordersCount,spentTotal,createdAt,lastLoginAt';
    const body = rows
      .map((r) =>
        [
          r.id,
          r.username,
          r.nickname ?? '',
          r.email,
          r.phone ?? '',
          r.role,
          r.status,
          r.ordersCount ?? 0,
          r.spentTotal ?? 0,
          r.createdAt,
          r.lastLoginAt ?? '',
        ]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const csv = `${header}\n${body}`;
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitloop-users-${dayjs().format('YYYYMMDD-HHmm')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<UserRow> | SorterResult<UserRow>[]
  ) => {
    const sorterArray = Array.isArray(sorter) ? sorter : [sorter];
    const activeSorter = sorterArray[0];

    const sortField = activeSorter?.field as keyof UserRow | undefined;
    const sortOrder = activeSorter?.order;

    if (sortOrder === 'ascend') {
      order = 'asc';
    } else if (sortOrder === 'descend') {
      order = 'desc';
    } else {
      order = undefined;
    }

    const roleFilter = (filters.role?.[0] as UserRole | undefined) ?? undefined;
    const statusFilter = (filters.status?.[0] as UserStatus | undefined) ?? undefined;

    setQuery((q) => ({
      ...q,
      sort: sortField && order ? `${String(sortField)}:${order}` : q.sort,
      role: (roleFilter as UserRole | 'ALL') ?? q.role,
      status: (statusFilter as UserStatus | 'ALL') ?? q.status,
      page: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    }));
  };

  return (
    <>
      <Space
        style={{
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            사용자 관리
          </Title>
          <Button icon={<ReloadOutlined />} onClick={fetchData} />
        </Space>
        <Space>
          <Button icon={<ExportOutlined />} onClick={exportCSV}>
            CSV 내보내기
          </Button>
          <Popconfirm
            title="선택 사용자 정지?"
            disabled={selectedRowKeys.length === 0}
            onConfirm={async () => {
              await mockBulkSuspendUsers(selectedRowKeys as number[]);
              message.success('선택 사용자를 정지했습니다.');
              setSelectedRowKeys([]);
              fetchData();
            }}
          >
            <Button danger icon={<StopOutlined />} disabled={selectedRowKeys.length === 0}>
              일괄 정지
            </Button>
          </Popconfirm>
          <Popconfirm
            title="선택 사용자 정지 해제?"
            disabled={selectedRowKeys.length === 0}
            onConfirm={async () => {
              await mockBulkActivateUsers(selectedRowKeys as number[]);
              message.success('선택 사용자를 정지를 해제했습니다.');
              setSelectedRowKeys([]);
              fetchData();
            }}
          >
            <Button icon={<CheckCircleOutlined />} disabled={selectedRowKeys.length === 0}>
              일괄 해제
            </Button>
          </Popconfirm>
        </Space>
      </Space>

      <Card>
        <Space wrap align="center">
          <Input
            allowClear
            placeholder="ID/계정/닉네임/이메일 검색"
            prefix={<SearchOutlined />}
            style={{ width: 280 }}
            value={query.q}
            onChange={(e) => setQuery((q) => ({ ...q, q: e.target.value, page: 1 }))}
            onPressEnter={() => fetchData()}
          />
          <Select
            style={{ width: 140 }}
            value={query.role}
            onChange={(v) => setQuery((q) => ({ ...q, role: v, page: 1 }))}
            options={[
              { value: 'ALL', label: '역할(전체)' },
              { value: 'ADMIN', label: 'ADMIN' },
              { value: 'MEMBER', label: 'MEMBER' },
            ]}
          />
          <Select
            style={{ width: 160 }}
            value={query.status}
            onChange={(v) => setQuery((q) => ({ ...q, status: v, page: 1 }))}
            options={[
              { value: 'ALL', label: '상태(전체)' },
              { value: 'ACTIVE', label: 'ACTIVE' },
              { value: 'SUSPENDED', label: 'SUSPENDED' },
              { value: 'DELETED', label: 'DELETED' },
            ]}
          />
          <RangePicker
            placeholder={['가입 시작', '가입 종료']}
            onChange={(v) =>
              setQuery((q) => ({
                ...q,
                joinedRange: v ? [v[0]!.toISOString(), v[1]!.toISOString()] : null,
                page: 1,
              }))
            }
          />
          <Button type="primary" onClick={fetchData}>
            검색
          </Button>
        </Space>

        <Divider />

        <Table<UserRow>
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={rows}
          rowSelection={rowSelection}
          onChange={handleTableChange}
          pagination={{
            total,
            current: query.page,
            pageSize: query.pageSize,
            showSizeChanger: true,
            onChange: (page, pageSize) =>
              setQuery((q) => ({
                ...q,
                page,
                pageSize,
              })),
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Drawer
        title={current ? `${current.username} 상세` : '상세'}
        open={drawerOpen}
        width={520}
        onClose={() => setDrawerOpen(false)}
        destroyOnClose
        extra={
          current && (
            <Space>
              <Popconfirm
                title="이 사용자를 소프트 삭제하시겠습니까?"
                onConfirm={async () => {
                  await mockSoftDeleteUser(current.id);
                  message.success('소프트 삭제되었습니다.');
                  setDrawerOpen(false);
                  fetchData();
                }}
              >
                <Button danger>삭제</Button>
              </Popconfirm>

              <Select
                value={current.role}
                style={{ width: 140 }}
                onChange={async (role: UserRole) => {
                  await mockUpdateUserRole(current.id, role);
                  message.success('역할이 변경되었습니다.');
                  setCurrent({ ...current, role });
                  fetchData();
                }}
                options={[
                  { value: 'ADMIN', label: 'ADMIN' },
                  { value: 'MEMBER', label: 'MEMBER' },
                ]}
                suffixIcon={<CrownOutlined />}
              />
            </Space>
          )
        }
      >
        {current && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="ID">{current.id}</Descriptions.Item>
            <Descriptions.Item label="계정">{current.username}</Descriptions.Item>
            <Descriptions.Item label="닉네임">
              {current.nickname || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="이메일">{current.email}</Descriptions.Item>
            <Descriptions.Item label="연락처">
              {current.phone || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="역할">
              <Tag color={roleColors[current.role]}>{current.role}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="상태">
              <Tag color={statusColors[current.status]}>{current.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="가입일">
              {dayjs(current.createdAt).format('YYYY-MM-DD HH:mm')}
            </Descriptions.Item>
            <Descriptions.Item label="최근 로그인">
              {current.lastLoginAt
                ? dayjs(current.lastLoginAt).format('YYYY-MM-DD HH:mm')
                : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="누적 주문">
              {current.ordersCount ?? 0}
            </Descriptions.Item>
            <Descriptions.Item label="누적 결제">
              {current.spentTotal ? (
                `${current.spentTotal.toLocaleString('ko-KR')}원`
              ) : (
                '-'
              )}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </>
  );
}
