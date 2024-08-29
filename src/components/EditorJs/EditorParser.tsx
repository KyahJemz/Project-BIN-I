import React from 'react';
import ReactDOMServer from 'react-dom/server';
import styles from './EditorParser.module.css';

export default function EditorParser() {
	const convertDataToHtml = (blocks) => {
		let convertedHtml = '';

		blocks.forEach((block) => {
			let blockElement;
			switch (block.type) {
				case 'header':
					const HeaderTag = `h${block.data.level}`;
					blockElement = (
						<HeaderTag
							key={block.id}
							className={styles[`header-${block.data.level}`]}
						>
							{block.data.text}
						</HeaderTag>
					);
					break;
				case 'paragraph':
					blockElement = (
						<p className={styles.paragraph} key={block.id}>
							{block.data.text}
						</p>
					);
					break;
				case 'list':
					const ListTag =
						block.data.style === 'ordered' ? 'ol' : 'ul';
					blockElement = (
						<div className={styles.listContainer} key={block.id}>
							<ListTag className={styles.customList}>
								{block.data.items.map((item, index) => (
									<li className={styles.listItem} key={index}>
										{item}
									</li>
								))}
							</ListTag>
						</div>
					);
					break;
				case 'quote':
					blockElement = (
						<blockquote className={styles.quote} key={block.id}>
							<p>{block.data.text}</p>
							<cite>{block.data.caption}</cite>
						</blockquote>
					);
					break;
				case 'code':
					blockElement = (
						<pre className={styles.codeBlock} key={block.id}>
							<code>{block.data.code}</code>
						</pre>
					);
					break;
				case 'image':
					blockElement = (
						<div className={styles.imageCard} key={block.id}>
							<img
								className={styles.imgFluid}
								src={block.data.file.url}
								alt={block.data.caption}
							/>
							<br />
							<em>{block.data.caption}</em>
						</div>
					);
					break;
				case 'embed':
					blockElement = (
						<div className={styles.embedContainer} key={block.id}>
							<iframe
								className={styles.embedIframe}
								width="560"
								height="315"
								src={block.data.embed}
								frameBorder="0"
								allow="autoplay; encrypted-media"
								allowFullScreen
							></iframe>
						</div>
					);
					break;
				case 'delimiter':
					blockElement = (
						<div className={styles.delimiter} key={block.id}></div>
					);
					break;
				case 'table':
					blockElement = (
						<div className={styles.tableContainer} key={block.id}>
							<table className={styles.customTable}>
								<thead>
									{block.data.withHeadings && (
										<tr>
											{block.data.content[0].map(
												(cell, index) => (
													<th
														className={
															styles.tableHeader
														}
														key={index}
													>
														{cell}
													</th>
												),
											)}
										</tr>
									)}
								</thead>
								<tbody>
									{block.data.content
										.slice(block.data.withHeadings ? 1 : 0)
										.map((row, rowIndex) => (
											<tr
												className={styles.tableRow}
												key={rowIndex}
											>
												{row.map((cell, cellIndex) => (
													<td
														className={
															styles.tableCell
														}
														key={cellIndex}
													>
														{cell}
													</td>
												))}
											</tr>
										))}
								</tbody>
							</table>
						</div>
					);
					break;
				case 'text-variant-tune':
					blockElement = (
						<span
							className={styles.textVariant}
							style={{ fontStyle: block.data.style }}
							key={block.id}
						>
							{block.data.text}
						</span>
					);
					break;
				default:
					console.log('Unknown block type', block.type);
					break;
			}

			if (blockElement) {
				convertedHtml += ReactDOMServer.renderToString(blockElement);
			}
		});

		return convertedHtml;
	};

	return { convertDataToHtml };
}
