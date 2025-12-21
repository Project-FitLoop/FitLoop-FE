"use client";

import React, { useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";

type BoardKey = "style" | "promo";

export default function WritePostModal({
  open,
  onClose,
  defaultBoard,
}: {
  open: boolean;
  onClose: () => void;
  defaultBoard: BoardKey;
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ board: defaultBoard });
    }
  }, [open, defaultBoard, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    console.log("새 글", values);
    message.success("게시글이 작성되었습니다. (프론트 임시)");
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="게시글 작성"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="등록"
      cancelText="취소"
      destroyOnClose
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="board"
          label="게시판"
          rules={[{ required: true, message: "게시판을 선택하세요." }]}
        >
          <Select
            options={[
              { label: "스타일 정보", value: "style" },
              { label: "홍보게시판", value: "promo" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="title"
          label="제목"
          rules={[{ required: true, message: "제목을 입력하세요." }]}
        >
          <Input maxLength={60} placeholder="제목을 입력하세요" />
        </Form.Item>

        <Form.Item
          name="content"
          label="내용"
          rules={[{ required: true, message: "내용을 입력하세요." }]}
        >
          <Input.TextArea rows={5} maxLength={1000} placeholder="내용을 입력하세요" />
        </Form.Item>

        <Form.Item name="tags" label="태그">
          <Select
            mode="tags"
            placeholder="태그를 입력하세요"
            tokenSeparators={[","]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
