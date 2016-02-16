#include <stdlib.h>
#include <stdio.h>
#include <math.h>




int* Carto_evalbot_spiral(int n){
    // given n an index in the squared spiral
    // p the sum of point in inner square
    // a the position on the current square
    // n = p + a

    double r = floor((sqrt(n + 1) - 1) / 2) + 1;

    // compute radius : inverse arithmetic sum of 8+16+24+...=
    int p = (8 * r * (r - 1)) / 2;
    // compute total point on radius -1 : arithmetic sum of 8+16+24+...

    int en =(int) r * 2;
    // points by face

    int a =(int) (1 + n - p) % ((int)(r * 8));
    // compute de position and shift it so the first is (-r,-r) but (-r+1,-r)
    // so square can connect

		int* pos = malloc(sizeof(int)*3);
    pos[0] = 0;
		pos[1] = 0;
		pos[2] = r;
    switch ((int)floor(a / (r * 2))) {
        // find the face : 0 top, 1 right, 2, bottom, 3 left
        case 0:
            {
                pos[0] = a - r;
                pos[1] = -r;
            }
            break;
        case 1:
            {
                pos[0] = r;
                pos[1] = (a % en) - r;

            }
            break;
        case 2:
            {
                pos[0] = r - (a % en);
                pos[1] = r;
            }
            break;
        case 3:
            {
                pos[0] = -r;
                pos[1] = r - (a % en);
            }
            break;
    }
    
    return pos;
}


int main(){
	int* call = Carto_evalbot_spiral(1);
	print("%i,%i,%i\n",call[0],call[1],call[2]);
	free(call);
}
