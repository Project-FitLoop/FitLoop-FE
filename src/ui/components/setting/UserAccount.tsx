"use client";

import React, { useEffect, useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { fetchUserInfo, deleteAccount } from "@/services/api/user";
import { Modal, message, Input } from "antd";

export default function UserAccount() {
  const [username, setUsername] = useState<string>("");

  const [isPwModalVisible, setIsPwModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const loadAccountInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUsername(data.username);
      } catch (error) {
        console.error("계정 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    loadAccountInfo();
  }, []);

  const handleAccountDeleteClick = () => {
    Modal.confirm({
      title: "정말로 계정을 삭제하시겠어요?",
      icon: <ExclamationCircleOutlined />,
      content: "계정을 삭제하면 복구할 수 없습니다. 진행하시겠습니까?",
      okText: "삭제하기",
      okType: "danger",
      cancelText: "취소",
      style: { top: 300 },
      async onOk() {
        try {
          await deleteAccount();
          message.success("계정이 성공적으로 삭제되었습니다.");
          document.cookie =
            "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/login";
        } catch (error) {
          console.error("계정 삭제 실패:", error);
          message.error("계정 삭제에 실패했습니다. 다시 시도해주세요.");
        }
      },
    });
  };

  const handlePasswordChange = () => {
    setIsPwModalVisible(true);
  };

  const handleConfirmPasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      message.warning("모든 필드를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.warning("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("현재 비밀번호:", currentPassword);
    console.log("새 비밀번호:", newPassword);

    message.success("비밀번호가 변경되었습니다.");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsPwModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 상단 헤더 */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <LeftOutlined
          className="text-lg text-black cursor-pointer"
          onClick={() => history.back()}
        />
        <h1 className="flex-1 text-center text-base font-bold text-black">
          계정정보
        </h1>
        <div style={{ width: 24 }} />
      </div>

      {/* 본문 */}
      <div className="flex flex-col gap-6 px-4 py-6 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 font-medium">아이디</span>
          <input
            value={username}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-black"
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 font-medium">비밀번호</span>
          <div className="flex gap-2">
            <input
              value="**********"
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-black"
            />
            <button
              onClick={handlePasswordChange}
              className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800 transition"
            >
              수정하기
            </button>
          </div>
        </div>

        {/* 계정 삭제 */}
        <div
          className="flex items-center justify-between py-4 border-t border-gray-200 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition"
          onClick={handleAccountDeleteClick}
        >
          <span className="text-[15px] font-medium text-red-500 flex items-center gap-1">
            계정 삭제
          </span>
          <RightOutlined className="text-[15px] text-gray-400" />
        </div>
      </div>

      {/* 비밀번호 변경 모달 */}
      <Modal
        title="비밀번호 변경"
        open={isPwModalVisible}
        onOk={handleConfirmPasswordChange}
        onCancel={() => setIsPwModalVisible(false)}
        okText="변경하기"
        cancelText="취소"
        style={{ top: 250 }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm text-gray-700">
              현재 비밀번호
            </label>
            <Input.Password
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호 입력"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">
              새 비밀번호
            </label>
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호 입력"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">
              새 비밀번호 확인
            </label>
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="새 비밀번호 다시 입력"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
