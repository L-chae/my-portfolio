export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;
  
  // 사용자의 질문을 포함하여 Mock 응답 생성
  const text = `이것은 비용이 발생하지 않는 Mock 스트리밍 응답입니다.\n질문하신 "${lastMessage}"에 대한 UI 렌더링 테스트가 성공적으로 동작하고 있습니다.`;
  
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (const char of text) {
        // Vercel AI SDK가 파싱할 수 있는 포맷으로 데이터 청크 전송
        controller.enqueue(encoder.encode(`0:${JSON.stringify(char)}\n`));
        await new Promise(resolve => setTimeout(resolve, 30)); // 타이핑 효과 지연
      }
      controller.close();
    }
  });

  return new Response(stream, { 
    headers: { 'Content-Type': 'text/plain; charset=utf-8' } 
  });
}