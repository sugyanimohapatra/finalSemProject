import React, { useEffect, useState } from "react";

const GlobalScoringMatrix = ({ sequence, data }) => {
  const [score, setScore] = useState({
    alignedSeq1: 0,
    alignedSeq2: 0,
    alignmentScore: 0,
  });

  const [matrix, setMatrix] = useState([]);

  function globalAlignment(sequence1, sequence2, match, mismatch, gap) {
    // Initialize the dynamic programming matrix
    let dp = new Array(sequence1.length + 1)
      .fill(null)
      .map(() => new Array(sequence2.length + 1).fill(0));

    // Initialize the first row and column of the matrix
    for (let i = 0; i <= sequence1.length; i++) {
      dp[i][0] = i * gap;
    }
    for (let j = 0; j <= sequence2.length; j++) {
      dp[0][j] = j * gap;
    }

    // Fill in the dynamic programming matrix
    for (let i = 1; i <= sequence1.length; i++) {
      for (let j = 1; j <= sequence2.length; j++) {
        // Calculate scores for diagonal, vertical, and horizontal movements
        let matchOrMismatch =
          sequence1[i - 1] === sequence2[j - 1] ? match : mismatch;
        dp[i][j] = Math.max(
          dp[i - 1][j - 1] + matchOrMismatch,
          Math.max(dp[i - 1][j] + gap, dp[i][j - 1] + gap)
        );
      }
    }

    for (let i = 0; i <= sequence1.length; i++) {
      let row = "";
      for (let j = 0; j <= sequence2.length; j++) {
        row += dp[i][j] + "\t";
      }
    }

    setMatrix(dp);
    // Perform traceback to get aligned sequences
    return traceback(sequence1, sequence2, dp, match, mismatch, gap);
  }

  // Function for traceback to get aligned sequences
  function traceback(sequence1, sequence2, dp, match, mismatch, gap) {
    let i = sequence1.length;
    let j = sequence2.length;
    let alignment1 = "";
    let alignment2 = "";

    while (i > 0 || j > 0) {
      let diagonalScore =
        i > 0 && j > 0 ? dp[i - 1][j - 1] : Number.MIN_SAFE_INTEGER;
      let upScore = i > 0 ? dp[i - 1][j] : Number.MIN_SAFE_INTEGER;
      let leftScore = j > 0 ? dp[i][j - 1] : Number.MIN_SAFE_INTEGER;

      if (i > 0 && j > 0 && sequence1[i - 1] === sequence2[j - 1]) {
        alignment1 = sequence1[i - 1] + alignment1;
        alignment2 = sequence2[j - 1] + alignment2;
        i--;
        j--;
      } else if (diagonalScore >= upScore && diagonalScore >= leftScore) {
        alignment1 = sequence1[i - 1] + alignment1;
        alignment2 = sequence2[j - 1] + alignment2;
        i--;
        j--;
      } else if (upScore >= leftScore) {
        alignment1 = sequence1[i - 1] + alignment1;
        alignment2 = "-" + alignment2;
        i--;
      } else {
        alignment1 = "-" + alignment1;
        alignment2 = sequence2[j - 1] + alignment2;
        j--;
      }
    }

    // Return the alignment result
    return setScore({
      alignedSeq1: alignment1,
      alignedSeq2: alignment2,
      alignmentScore: dp[sequence1.length][sequence2.length],
    });
  }

  useEffect(() => {
    globalAlignment(
      sequence.sequence1,
      sequence.sequence2,
      data.match,
      data.misMatch,
      data.gap
    );
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

export default GlobalScoringMatrix;
