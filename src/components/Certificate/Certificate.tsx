"use client";

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = () => {
	const certificateRef = useRef(null);

	const generatePDF = async () => {
		const certificateElement = certificateRef.current;

		if (!certificateElement) {
			throw new Error('Certificate element not found');
		}

		// Increase the scale to improve quality
		const canvas = await html2canvas(certificateElement, { scale: 3 }); // Higher scale for better resolution
		const imgData = canvas.toDataURL('image/png');

		const pdf = new jsPDF('landscape', 'mm', 'a4'); // Landscape A4
		const imgWidth = 297; // A4 width in mm (landscape)
		const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

		pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
		pdf.save('certificate.pdf');
	};

	return (
		<div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
				ref={certificateRef}
				style={{
					width: '1122px',  // 1122px = 297mm at 96 DPI
					height: '810px',  // 793px = 210mm at 96 DPI
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
					<div style={{ fontSize: '40px', marginTop: '305px', width: '100%' }}>
						Certificate of Completion
					</div>
					<div style={{ fontSize: '25px', marginTop: '5px' }}>John Doe</div>
					<div style={{ fontSize: '13px', marginTop: '90px' }}>Given this 27th of December 2022</div>
				</div>
			</div>
		</div>
	);
};

export default Certificate;
