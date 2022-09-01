import './Toast.css';

export const ToastComponent = () => {
    return <div id="toast"></div>;
};

export const runToast = (string) => {
    let removeToast;
    const toast = document.getElementById('toast');

    if (toast.classList.contains('reveal')) {
        clearTimeout(removeToast);
        removeToast = setTimeout(function () {
            document.getElementById('toast').classList.remove('reveal');
        }, 1000);
    } else {
        removeToast = setTimeout(function () {
            document.getElementById('toast').classList.remove('reveal');
        }, 1000);
    }

    toast.classList.add('reveal');
    toast.innerText = string;
};
