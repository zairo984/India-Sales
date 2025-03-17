declare module "react-image-zoom" {
	interface ImageZoomProps {
		width: number;
		height: number;
		zoomWidth?: number;
		zoomPosition?: string;
		img: string;
		zoomImg:string
		scale?: number;
		zoomStyle?: string;
		offset?: { vertical: number; horizontal: number };
	}

	const ImageZoom: React.FC<ImageZoomProps>;
	export default ImageZoom;
}
