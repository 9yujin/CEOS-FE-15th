import React from 'react';

// 예전에 모달창 컴포넌트로 만들어놨던 소스가 있어서, 사용하려고 갖고왔는데 타입스크립트로 바꾸는 과정에
// 막혀서 사용하지 못했습니다.. children을 넘길땐 React:FC 타입을 사용하라고 봤는데, forwardRef와는 같이 사용을 못하는것 같네요.
// 혹시 이런 상황에선 어떻게 해야하는지 알수 있을까요??

/* const ModalComponent = ({ children }, ref) => {
  return (
    <div className="modal hidden" ref={ref}>
      <div
        className="modal-overlay"
        onClick={() => {
          ref.current.classList.add('hidden');
        }}
      ></div>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default React.forwardRef(ModalComponent); */
