// https://stackoverflow.com/questions/54121536/typescript-module-svg-has-no-exported-member-reactcomponent

declare module '*.svg' {
    const content: any;
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default src;
}
