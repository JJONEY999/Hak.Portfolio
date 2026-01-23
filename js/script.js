// 1. 전역 변수 설정
let currentIndex = 0;
let sections = [];
let isTransitioning = false; 

// 2. 초기 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    sections = document.querySelectorAll('.section');
    updateUI(); 
    // startAutoSlide(); -> 자동 재생 기능 삭제
});

// 3. UI 업데이트 함수
function updateUI() {
    if (sections.length > 0) {
        sections.forEach((sec, i) => {
            // active 클래스 교체로 페이드 인/아웃 발생
            sec.classList.toggle('active', i === currentIndex);
        });

        // 화살표 이미지 변경 (포트폴리오 페이지용)
        const leftArrow = document.querySelector('.arrow-left');
        const rightArrow = document.querySelector('.arrow-right');

        if (leftArrow && rightArrow) {
            leftArrow.style.backgroundImage = `url('images/arrow_left${currentIndex}.png')`;
            rightArrow.style.backgroundImage = `url('images/arrow_right${currentIndex}.png')`;
        }
    }
}

// 4. 다음 페이지로 이동
function goNext() {
    if (isTransitioning || sections.length <= 1) return;

    isTransitioning = true;
    currentIndex = (currentIndex + 1) % sections.length;
    updateUI();

    // 전환 시간(0.8초) 동안 중복 클릭 방지
    setTimeout(() => {
        isTransitioning = false;
    }, 800);
}

// 5. 이전 페이지로 이동
function goPrev() {
    if (isTransitioning || sections.length <= 1) return;

    isTransitioning = true;
    currentIndex = (currentIndex - 1 + sections.length) % sections.length;
    updateUI();

    setTimeout(() => {
        isTransitioning = false;
    }, 800);
}

// 6. 메뉴 토글
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) sideMenu.classList.toggle('active');
}

// 7. 마우스 휠 이벤트 추가
window.addEventListener('wheel', (e) => {
    // 메뉴가 열려있을 때는 휠 작동 방지 (선택 사항)
    const sideMenu = document.getElementById('sideMenu');
    const popup = document.getElementById('landingPopup');
    if (sideMenu && sideMenu.classList.contains('active')) return;

    if (popup && popup.classList.contains('show')) {
        // 팝업이 열려있다면 아래 코드를 실행하지 않고 리턴(중단)
        return; 
    }

    // e.deltaY가 양수이면 아래로 굴림(다음), 음수이면 위로 굴림(이전)
    if (e.deltaY > 0) {
        goNext();
    } else {
        goPrev();
    }
}, { passive: true });

// 팝업 열기 함수
function openPopup(index) {
    const popup = document.getElementById('landingPopup');
    const body = document.getElementById('popupBody');
    
    // 각 인덱스(포트폴리오 번호)에 맞는 랜딩 내용 설정
    let content = "";
    
    if(index === 1) {
        content = "<img src='images/portfolio_website.png' style='width:100%'/>";
    } else if(index === 2) {
        content = "<img src='images/portfolio_tshirt.png' style='width:100%'/>";
    } else if(index === 3) {
        content = "<img src='images/portfolio_event.png' style='width:100%'/>";
    } else if(index === 4) {
        content = "<img src='images/portfolio_moblie.png' style='width:100%'/>";
    } else if(index === 5) {
        content = "<img src='images/portfolio_brand.png' style='width:100%'/>";
    } else if(index === 6) {
        content = "<img src='images/portfolio_postcard.png' style='width:100%'/>";
    } else if(index === 7) {
        content = "<img src='images/portfolio_poster.png' style='width:100%'/>";
    }

    else if (index === 8) {
        // Portfolio 2의 '사이트 바로가기'를 눌렀을 때 보여줄 이미지
        content = "<img src='images/event_page.jpg' style='width:100%'/>";
    // ... 7번까지 조건 추가
    }
    body.innerHTML = content; // 내용 삽입
    popup.style.display = 'flex'; // 먼저 표시
    setTimeout(() => popup.classList.add('show'), 10); // 부드러운 페이드인
}

// 팝업 닫기 함수
function closePopup() {
    const popup = document.getElementById('landingPopup');
    popup.classList.remove('show');
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

// 팝업 바깥쪽 클릭 시 닫기
window.onclick = function(event) {
    const popup = document.getElementById('landingPopup');
    if (event.target == popup) {
        closePopup();
    }
}