export default function SignUpPendingPage() {
  return (
    <div className="text-center">
      <h1 className="mb-6 text-lg font-semibold">이메일을 확인해주세요</h1>

      <p className="mb-2 text-sm text-gray-600">
        입력하신 이메일로 인증 링크를 보냈습니다.
      </p>
      <p className="mb-6 text-sm text-gray-600">
        메일의 링크를 클릭하면 가입이 완료되고 로그인할 수 있어요.
      </p>
    </div>
  );
}
