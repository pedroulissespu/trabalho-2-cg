// ============================================================
// Geometrias procedurais geradas manualmente no código
// (sem importação de modelos externos para o cenário)
// ============================================================

// --- Esfera UV (usada nos alvos) ---
function buildSphere(radius, stacks, slices) {
    var pos = [], tex = [], nor = [];

    for (var i = 0; i <= stacks; i++) {
        var phi = Math.PI * i / stacks;
        for (var j = 0; j <= slices; j++) {
            var theta = 2 * Math.PI * j / slices;

            var x = radius * Math.sin(phi) * Math.cos(theta);
            var y = radius * Math.cos(phi);
            var z = radius * Math.sin(phi) * Math.sin(theta);

            pos.push(x, y, z);
            tex.push(j / slices, i / stacks);
            nor.push(x / radius, y / radius, z / radius);
        }
    }

    var indices = [];
    for (var i = 0; i < stacks; i++) {
        for (var j = 0; j < slices; j++) {
            var a = i * (slices + 1) + j;
            var b = a + slices + 1;
            indices.push(a, b, a + 1);
            indices.push(b, b + 1, a + 1);
        }
    }

    // Expande indexed para flat
    var fpos = [], ftex = [], fnor = [];
    for (var k = 0; k < indices.length; k++) {
        var idx = indices[k];
        fpos.push(pos[idx * 3], pos[idx * 3 + 1], pos[idx * 3 + 2]);
        ftex.push(tex[idx * 2], tex[idx * 2 + 1]);
        fnor.push(nor[idx * 3], nor[idx * 3 + 1], nor[idx * 3 + 2]);
    }

    return {
        positions:   new Float32Array(fpos),
        texcoords:   new Float32Array(ftex),
        normals:     new Float32Array(fnor),
        vertexCount: fpos.length / 3
    };
}

// --- Cubo unitário (sala / paredes) ---
// face = [px, py, pz, nx, ny, nz, tx, ty] por vértice, 2 triângulos
function buildBox(w, h, d) {
    var hw = w / 2, hh = h / 2, hd = d / 2;

    // 6 faces, cada face = 2 triângulos = 6 vértices
    //  px,py,pz  nx,ny,nz  tx,ty
    var quads = [
        // frente  (z = +hd, normal 0,0,1)
        [[-hw,-hh, hd, 0,0,1, 0,1],[ hw,-hh, hd, 0,0,1, 1,1],[ hw, hh, hd, 0,0,1, 1,0],
         [-hw,-hh, hd, 0,0,1, 0,1],[ hw, hh, hd, 0,0,1, 1,0],[-hw, hh, hd, 0,0,1, 0,0]],
        // trás    (z = -hd, normal 0,0,-1)
        [[ hw,-hh,-hd, 0,0,-1,0,1],[-hw,-hh,-hd, 0,0,-1,1,1],[-hw, hh,-hd, 0,0,-1,1,0],
         [ hw,-hh,-hd, 0,0,-1,0,1],[-hw, hh,-hd, 0,0,-1,1,0],[ hw, hh,-hd, 0,0,-1,0,0]],
        // direita (x = +hw, normal 1,0,0)
        [[ hw,-hh, hd, 1,0,0, 0,1],[ hw,-hh,-hd, 1,0,0, 1,1],[ hw, hh,-hd, 1,0,0, 1,0],
         [ hw,-hh, hd, 1,0,0, 0,1],[ hw, hh,-hd, 1,0,0, 1,0],[ hw, hh, hd, 1,0,0, 0,0]],
        // esquerda(x = -hw, normal -1,0,0)
        [[-hw,-hh,-hd,-1,0,0, 0,1],[-hw,-hh, hd,-1,0,0, 1,1],[-hw, hh, hd,-1,0,0, 1,0],
         [-hw,-hh,-hd,-1,0,0, 0,1],[-hw, hh, hd,-1,0,0, 1,0],[-hw, hh,-hd,-1,0,0, 0,0]],
        // topo    (y = +hh, normal 0,1,0)
        [[-hw, hh, hd, 0,1,0, 0,1],[ hw, hh, hd, 0,1,0, 1,1],[ hw, hh,-hd, 0,1,0, 1,0],
         [-hw, hh, hd, 0,1,0, 0,1],[ hw, hh,-hd, 0,1,0, 1,0],[-hw, hh,-hd, 0,1,0, 0,0]],
        // chão    (y = -hh, normal 0,-1,0)
        [[-hw,-hh,-hd, 0,-1,0,0,1],[ hw,-hh,-hd, 0,-1,0,1,1],[ hw,-hh, hd, 0,-1,0,1,0],
         [-hw,-hh,-hd, 0,-1,0,0,1],[ hw,-hh, hd, 0,-1,0,1,0],[-hw,-hh, hd, 0,-1,0,0,0]]
    ];

    var fpos = [], ftex = [], fnor = [];
    for (var f = 0; f < quads.length; f++) {
        for (var v = 0; v < 6; v++) {
            var vd = quads[f][v];
            fpos.push(vd[0], vd[1], vd[2]);
            fnor.push(vd[3], vd[4], vd[5]);
            ftex.push(vd[6], vd[7]);
        }
    }

    return {
        positions:   new Float32Array(fpos),
        texcoords:   new Float32Array(ftex),
        normals:     new Float32Array(fnor),
        vertexCount: fpos.length / 3
    };
}

// --- Quad plano (chão com textura) ---
// tiles: repetições da textura (para salas grandes não ficarem esticadas)
function buildQuad(size, tiles) {
    tiles = tiles || 1;
    var s = size / 2;
    var t = tiles;
    var fpos = [-s,0,-s,  s,0,-s,  s,0,s,  -s,0,-s,  s,0,s,  -s,0,s];
    var ftex = [0,0, t,0, t,t,  0,0, t,t, 0,t];
    var fnor = [0,1,0, 0,1,0, 0,1,0,  0,1,0, 0,1,0, 0,1,0];
    return {
        positions:   new Float32Array(fpos),
        texcoords:   new Float32Array(ftex),
        normals:     new Float32Array(fnor),
        vertexCount: 6
    };
}
