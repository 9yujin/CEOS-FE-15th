import styled, { css } from 'styled-components';
const Squircle = ({ imageUrl, selected, size }: { imageUrl: string; selected: boolean; size: number }) => {
    return (
        <UserImage size={size}>
            <svg className="svg-profile" viewBox="0 0 88 88">
                <defs>
                    <path
                        id="shapeSquircle"
                        d="M44,0 C76.0948147,0 88,11.9051853 88,44 C88,76.0948147 76.0948147,88 44,88 C11.9051853,88 0,76.0948147 0,44 C0,11.9051853 11.9051853,0 44,0 Z"
                    ></path>
                    <clipPath id="clipSquircle">
                        <use xlinkHref="#shapeSquircle" />
                    </clipPath>
                </defs>
                <SquircleImage
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#clipSquircle)"
                    xlinkHref={imageUrl}
                    selected={selected}
                />
            </svg>
        </UserImage>
    );
};

export default Squircle;

const UserImage = styled.div<{ size: number }>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
`;

const SquircleImage = styled.image<{ selected: boolean }>`
    ${({ selected }) =>
        selected &&
        css`
            filter: brightness(50%);
        `}
`;
