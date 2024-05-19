import React, { useEffect, useState } from "react";

const LocalScoringMatrix = ({ sequence, data }) => {

  const [score, setScore] = useState({
    alignedSeq1: 0,
    alignedSeq2: 0,
    alignmentScore: 0,
  });

  const [matrix, setMatrix] = useState([]);

  const localAlignment = (sequence1, sequence2, match, mismatch, gap) => {
    // Initialization of the dynamic programming matrix
    const dp = Array.from({ length: sequence1.length + 1 }, () => Array(sequence2.length + 1).fill(0));

    // Initialize the first row and column of the matrix to 0
    for (let i = 0; i <= sequence1.length; i++) {
        dp[i][0] = 0;
    }
    for (let j = 0; j <= sequence2.length; j++) {
        dp[0][j] = 0;
    }

    // Fill in the dynamic programming matrix
    for (let i = 1; i <= sequence1.length; i++) {
        for (let j = 1; j <= sequence2.length; j++) {
            const matchOrMismatch = sequence1[i - 1] === sequence2[j - 1] ? match : mismatch;
            dp[i][j] = Math.max(
                dp[i - 1][j - 1] + matchOrMismatch,
                Math.max(
                    dp[i - 1][j] + gap,
                    dp[i][j - 1] + gap
                )
            );
            dp[i][j] = Math.max(dp[i][j], 0);
            console.log("dp loop",dp[i][j])
        }
    }
    // Print the alignment matrix
    console.log("Matrix:");
    for (let i = 0; i <= sequence1.length; i++) {
        let row = "";
        for (let j = 0; j <= sequence2.length; j++) {
            row += dp[i][j] + "\t";
        }
        console.log(row);
    }

    setMatrix(dp);
    return traceback(sequence1, sequence2, dp, match, mismatch, gap);
  };

  const traceback = (sequence1, sequence2, dp, match, mismatch, gap) => {
    let i = sequence1.length;
    let j = sequence2.length;
    let alignment1 = "";
    let alignment2 = "";

    while (i > 0 || j > 0) {
      const diagonalScore =
        i > 0 && j > 0 ? dp[i - 1][j - 1] : Number.MIN_SAFE_INTEGER;
      const upScore = i > 0 ? dp[i - 1][j] : Number.MIN_SAFE_INTEGER;
      const leftScore = j > 0 ? dp[i][j - 1] : Number.MIN_SAFE_INTEGER;

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

    return setScore({
      alignedSeq1: alignment1,
      alignedSeq2: alignment2,
      alignmentScore: dp[sequence1.length][sequence2.length],
    });
  };

  useEffect(() => {
    localAlignment(
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

export default LocalScoringMatrix;
