//https://open.er-api.com/v6/latest/USD

//1.원화를 입력받아서 달러로 계산
//2.엔화도 계산하기

$(function () {
  $("#convertBtn").click(function () {
    const krw = parseFloat($("#krw").val());

    if (isNaN(krw) || krw <= 0) {
      //isNaN =  value가 숫자가 아닌 경우에 true를 반환하고, 숫자인 경우에는 false를 반환합니다.
      $("#result").html(
        "<p style='color:red;'>올바른 원화 금액을 입력하세요.</p>"
      );
      return;
    }

    $("#result").html("<p>환율 정보를 불러오는 중입니다...</p>");

    // 미국 달러 기준 환율 불러오기
    $.get("https://open.er-api.com/v6/latest/USD")
      .done(function (data) {
        const usdToKrw = data.rates.KRW;
        const usdToJpy = data.rates.JPY;

        if (!usdToKrw || !usdToJpy) {
          $("#result").html(
            "<p style='color:red;'>환율 정보를 가져올 수 없습니다.</p>"
          );
          return;
        }

        const usd = krw / usdToKrw;
        const jpy = usd * usdToJpy;

        $("#result").html(`
          <p>입력한 원화: <strong>${krw.toLocaleString()} ₩</strong></p>
          <p>환산된 달러: <strong>${usd.toFixed(2)} $</strong></p>
          <p>환산된 엔화: <strong>${jpy.toFixed(2)} ¥</strong></p>
        `);
      })
      .fail(function () {
        $("#result").html("<p style='color:red;'>환율 API 요청 실패</p>");
      });
  });
});
