let openModal = document.querySelector('.activateYobicode'),
    codeInput = document.querySelector('[name="code"]'),
    code = '123';

    openModal.addEventListener("click", insertCode);
    function insertCode() {
        codeInput.value = code;
        console.log(codeInput);
    }