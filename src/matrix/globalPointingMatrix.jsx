import React, { useEffect, useState } from "react";

const GlobalPointingMatrix = ({ sequence, data }) => {
  const [score, setScore] = useState({
    alignedSeq1: 0,
    alignedSeq2: 0,
    alignmentScore: 0,
  });
  const { sequence1, sequence2 } = sequence;
  const { match, misMatch, gap, diagonal, vertical, horizontal } = data;

  const [matrix, setMatrix] = useState([]);
  function initializeMatrices(seq1, seq2) {
    const alignmentMatrix = new Array(seq1.length + 1)
      .fill(null)
      .map(() => new Array(seq2.length + 1).fill(0));
    const pointingMatrix = new Array(seq1.length + 1)
      .fill(null)
      .map(() => new Array(seq2.length + 1).fill(0));

    // Initialize the first row and first column of the matrices
    for (let i = 0; i <= seq1.length; i++) {
      alignmentMatrix[i][0] = i * gap;
      pointingMatrix[i][0] = vertical;
    }
    for (let j = 0; j <= seq2.length; j++) {
      alignmentMatrix[0][j] = j * gap;
      pointingMatrix[0][j] = horizontal;
    }

    return { alignmentMatrix, pointingMatrix };
  }

  // Function to perform global sequence alignment
  function globalAlignment(
    seq1,
    seq2,
    match,
    mismatch,
    gap,
    diagonal,
    vertical,
    horizontal
  ) {
    // Initialize matrices
    const { alignmentMatrix, pointingMatrix } = initializeMatrices(
      seq1,
      seq2
    );

    // Fill in the matrices
    for (let i = 1; i <= seq1.length; i++) {
      for (let j = 1; j <= seq2.length; j++) {
        const matchOrMismatch = seq1[i - 1] === seq2[j - 1] ? match : mismatch;
        const scoreDiagonal = alignmentMatrix[i - 1][j - 1] + matchOrMismatch;
        const scoreVertical = alignmentMatrix[i - 1][j] + gap;
        const scoreHorizontal = alignmentMatrix[i][j - 1] + gap;

        if (
          scoreDiagonal >= scoreVertical &&
          scoreDiagonal >= scoreHorizontal
        ) {
          alignmentMatrix[i][j] = scoreDiagonal;
          pointingMatrix[i][j] = diagonal;
        } else if (
          scoreVertical >= scoreDiagonal &&
          scoreVertical >= scoreHorizontal
        ) {
          alignmentMatrix[i][j] = scoreVertical;
          pointingMatrix[i][j] = vertical;
        } else {
          alignmentMatrix[i][j] = scoreHorizontal;
          pointingMatrix[i][j] = horizontal;
        }
      }
    }

    setMatrix(pointingMatrix)
  
    traceback(
      seq1,
      seq2,
      alignmentMatrix,
      pointingMatrix,
      gap,
      diagonal,
      vertical,
      horizontal
    );
  }

  // Function for traceback to find aligned sequences
  function traceback(
    seq1,
    seq2,
    alignmentMatrix,
    pointingMatrix,
    gap,
    diagonal,
    vertical,
    horizontal
  ) {
    let alignedSeq1 = "";
    let alignedSeq2 = "";
    let i = seq1.length;
    let j = seq2.length;

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && pointingMatrix[i][j] === diagonal) {
        alignedSeq1 = seq1[i - 1] + alignedSeq1;
        alignedSeq2 = seq2[j - 1] + alignedSeq2;
        i--;
        j--;
      } else if (i > 0 && pointingMatrix[i][j] === vertical) {
        alignedSeq1 = seq1[i - 1] + alignedSeq1;
        alignedSeq2 = "-" + alignedSeq2;
        i--;
      } else {
        alignedSeq1 = "-" + alignedSeq1;
        alignedSeq2 = seq2[j - 1] + alignedSeq2;
        j--;
      }
    }

    let alignmentScore = alignmentMatrix[seq1.length][seq2.length];

    return setScore({
      alignedSeq1: alignedSeq1,
      alignedSeq2: alignedSeq2,
      alignmentScore: alignmentScore,
    });
  }

  useEffect(() => {
    globalAlignment(sequence1, sequence2, match, misMatch, gap, diagonal, vertical, horizontal);
  }, []);
  return (
    <div className="output_container">
      <div className="matrix_container">
        <div>
          Hence The matrix is : 
        </div>
        <div>
          {matrix.map((row, rowIndex) => (
            <div style={{ display: "flex", gap: "10px" }} key={rowIndex}>
              {row.map((element, colIndex) => (
                <span key={colIndex}>{element} </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>Aligned Sequence 1 : {score.alignedSeq1}</div>
        <div>Aligned Sequence 2 : {score.alignedSeq2}</div>
        <div>Alignment Score : {score.alignmentScore}</div>
      </div>
    </div>
  );
};

export default GlobalPointingMatrix;
