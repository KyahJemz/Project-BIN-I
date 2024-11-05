"use client";

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = ({date, name, title}: {date: string, name: string, title: string}) => {
	const certificateRef = useRef(null);

	const generatePDF = async () => {
		const certificateElement = certificateRef.current;

		if (!certificateElement) {
			throw new Error('Certificate element not found');
		}

		const canvas = await html2canvas(certificateElement, { scale: 3 });
		const imgData = canvas.toDataURL('image/png');

		const pdf = new jsPDF('landscape', 'mm', 'a4');

		const pageWidth = pdf.internal.pageSize.getWidth();
		const pageHeight = pdf.internal.pageSize.getHeight();

		pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
		pdf.save('certificate.pdf');
	};

	return (
		<div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
			<button
				onClick={generatePDF}
				style={{
					marginBottom: '10px',
					alignSelf: 'end',
					width: 'max-content',
					border: '1px solid #000',
					padding: '5px 10px',
					cursor: 'pointer',
					borderRadius: '5px',
				}}
			>
				Download Certificate as PDF
			</button>
			<div
				style={{
					width: '1140px',
					height: '800px',
					position: 'relative',
					backgroundImage: 'url("/images/cert-template.png")',
					backgroundSize: 'cover',
					margin: '0 auto',
					border: '1px solid #000',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: '0',
						left: '50%',
						transform: 'translate(-50%, 0)',
						color: '#000',
						textAlign: 'center',
						width: '100%',
					}}
				>
					<div style={{ fontSize: '40px', marginTop: '310px', width: '100%' }}>{name}</div>
					<div style={{ fontSize: '25px', marginTop: '5px', }}>{title}</div>
					<div style={{ fontSize: '15px', marginTop: '100px',  }}>Given this {date}</div>
				</div>
			</div>
			<div
				ref={certificateRef}
				style={{
					width: '1140px',
					height: '800px',
					position: 'absolute',
					backgroundImage: 'url("/images/cert-template.png")',
					backgroundSize: 'cover',
					margin: '0 auto',
					border: '1px solid #000',
					marginTop: '46px',
					zIndex: -1,
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: '0',
						left: '50%',
						transform: 'translate(-50%, 0)',
						color: '#000',
						textAlign: 'center',
						width: '100%',
					}}
				>
					<div style={{ fontSize: '40px', marginTop: '295px', width: '100%' }}>{name}</div>
					<div style={{ fontSize: '25px', marginTop: '5px', }}>{title}</div>
					<div style={{ fontSize: '15px', marginTop: '100px',  }}>Given this {date}</div>
				</div>
			</div>
		</div>

		
	);
};

export default Certificate;
