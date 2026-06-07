const pptxgen = require('pptxgenjs');
const path = require('path');
const html2pptx = require(path.resolve('C:/Users/Walterrickman/.gemini/config/skills/pptx-official/scripts/html2pptx.js'));

const SLIDES_DIR = path.resolve(__dirname, 'slides');
const FIGS_DIR = path.resolve(__dirname, '..', 'results', 'figures', 'manuscript');

async function build() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Walter Odur';
    pptx.title = 'Single-Cell Transcriptomics of TB Granulomas Reveals Host-Directed Drug Candidates Through Ensemble Machine Learning';

    // Slide 1: Title
    await html2pptx(path.join(SLIDES_DIR, 'slide01_title.html'), pptx);

    // Slide 2: Background
    await html2pptx(path.join(SLIDES_DIR, 'slide02_background.html'), pptx);

    // Slide 3: Problem
    await html2pptx(path.join(SLIDES_DIR, 'slide03_problem.html'), pptx);

    // Slide 4: Objectives
    await html2pptx(path.join(SLIDES_DIR, 'slide04_objectives.html'), pptx);

    // Slide 5: Methods
    await html2pptx(path.join(SLIDES_DIR, 'slide05_methods.html'), pptx);

    // Slide 6: Figure 1 - Data Overview
    const { slide: s6 } = await html2pptx(path.join(SLIDES_DIR, 'slide06_fig1.html'), pptx);
    const fig1W = 3558, fig1H = 2494, fig1Ar = fig1W / fig1H;
    const f1h = 3.3; const f1w = f1h * fig1Ar;
    s6.addImage({ path: path.join(FIGS_DIR, 'figure1_data_overview.png'), x: 0.3, y: 0.8, w: f1w, h: f1h });

    // Slide 7: Figure 2 - Dimensionality Reduction
    const { slide: s7 } = await html2pptx(path.join(SLIDES_DIR, 'slide07_fig2.html'), pptx);
    const fig2W = 3913, fig2H = 1400, fig2Ar = fig2W / fig2H;
    const f2h = 3.3; const f2w = f2h * fig2Ar;
    const f2wClamped = Math.min(f2w, 5.5);
    const f2hClamped = f2wClamped / fig2Ar;
    s7.addImage({ path: path.join(FIGS_DIR, 'figure2_dimensionality_reduction.png'), x: 0.3, y: 0.8, w: f2wClamped, h: f2hClamped });

    // Slide 8: Figure 3 - Model Performance
    const { slide: s8 } = await html2pptx(path.join(SLIDES_DIR, 'slide08_fig3.html'), pptx);
    const fig3W = 3612, fig3H = 3017, fig3Ar = fig3W / fig3H;
    const f3h = 3.9; const f3w = f3h * fig3Ar;
    s8.addImage({ path: path.join(FIGS_DIR, 'figure3_model_performance.png'), x: 0.2, y: 0.7, w: f3w, h: f3h });

    // Slide 9: Hyperparameter Tuning Table
    const { slide: s9 } = await html2pptx(path.join(SLIDES_DIR, 'slide09_tuning.html'), pptx);
    const hdrOpts = { fill: { color: '2C3E50' }, color: 'FFFFFF', bold: true, fontSize: 13, fontFace: 'Calibri', align: 'center', valign: 'middle' };
    const cellOpts = { fontSize: 13, fontFace: 'Calibri', align: 'center', valign: 'middle' };
    const tuningTable = [
        [
            { text: 'Model', options: hdrOpts },
            { text: 'Baseline AUC', options: hdrOpts },
            { text: 'Tuned AUC', options: hdrOpts },
            { text: '\u0394AUC', options: hdrOpts }
        ],
        [
            { text: 'Random Forest', options: cellOpts },
            { text: '0.944', options: cellOpts },
            { text: '0.926', options: cellOpts },
            { text: '\u20130.019', options: { ...cellOpts, color: 'C0392B' } }
        ],
        [
            { text: 'XGBoost', options: cellOpts },
            { text: '0.962', options: cellOpts },
            { text: '0.961', options: cellOpts },
            { text: '\u20130.001', options: { ...cellOpts, color: '7F8C8D' } }
        ],
        [
            { text: 'LightGBM', options: cellOpts },
            { text: '0.970', options: cellOpts },
            { text: '0.967', options: cellOpts },
            { text: '\u20130.003', options: { ...cellOpts, color: 'E67E22' } }
        ],
        [
            { text: 'Stacking Ensemble', options: cellOpts },
            { text: '0.968', options: cellOpts },
            { text: '0.964', options: cellOpts },
            { text: '\u20130.004', options: { ...cellOpts, color: 'E67E22' } }
        ]
    ];
    s9.addTable(tuningTable, {
        x: 0.8, y: 2.0, w: 8.4, colW: [2.5, 2.0, 2.0, 1.9],
        rowH: [0.4, 0.38, 0.38, 0.38, 0.38],
        border: { pt: 0.5, color: 'CCCCCC' }
    });

    // Slide 10: Figure 4 - SHAP Disease Signature
    const { slide: s10 } = await html2pptx(path.join(SLIDES_DIR, 'slide10_fig4.html'), pptx);
    const fig4W = 3619, fig4H = 3017, fig4Ar = fig4W / fig4H;
    const f4h = 3.9; const f4w = f4h * fig4Ar;
    s10.addImage({ path: path.join(FIGS_DIR, 'figure4_disease_signature.png'), x: 0.2, y: 0.7, w: f4w, h: f4h });

    // Slide 11: Figure 6 - Expression Heatmap
    const { slide: s11 } = await html2pptx(path.join(SLIDES_DIR, 'slide11_fig6.html'), pptx);
    const fig6W = 3514, fig6H = 2120, fig6Ar = fig6W / fig6H;
    const f6h = 3.7; const f6w = f6h * fig6Ar;
    s11.addImage({ path: path.join(FIGS_DIR, 'figure6_expression_heatmap.png'), x: 0.2, y: 0.7, w: f6w, h: f6h });

    // Slide 12: Figure 5 - Drug Repurposing
    const { slide: s12 } = await html2pptx(path.join(SLIDES_DIR, 'slide12_fig5.html'), pptx);
    const fig5W = 3697, fig5H = 2554, fig5Ar = fig5W / fig5H;
    const f5h = 3.7; const f5w = f5h * fig5Ar;
    s12.addImage({ path: path.join(FIGS_DIR, 'figure5_drug_repurposing.png'), x: 0.2, y: 0.7, w: f5w, h: f5h });

    // Slide 13: Discussion
    await html2pptx(path.join(SLIDES_DIR, 'slide13_discussion.html'), pptx);

    // Slide 14: Future Directions & Conclusions
    await html2pptx(path.join(SLIDES_DIR, 'slide14_conclusions.html'), pptx);

    // Slide 15: References
    await html2pptx(path.join(SLIDES_DIR, 'slide15_references.html'), pptx);

    // Slide 16: Thank You
    await html2pptx(path.join(SLIDES_DIR, 'slide16_thankyou.html'), pptx);

    const outPath = path.join(__dirname, 'TB_ML_Presentation.pptx');
    await pptx.writeFile({ fileName: outPath });
    console.log('Presentation saved to:', outPath);
}

build().catch(err => { console.error('ERROR:', err.message || err); process.exit(1); });
