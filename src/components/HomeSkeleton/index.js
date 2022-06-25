import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function HomeSkeleton() {
    return (
        <div className="container p-1 d-flex flex-wrap justify-content-center w-100">
            <SkeletonTheme baseColor="#fff" highlightColor="#c5c5c5" >
                {
                    Array(20).fill().map((value, index) => {
                        return (
                            <div className="col col-3 col-sm-2 p-0 m-1 d-flex flex-column" key={ index }>
                                <Skeleton width="100%" height={140} className="p-0" />
                                <p className="m-0">
                                    <Skeleton width="100%" height={10} />
                                </p>
                                <p className="m-0">
                                    <Skeleton width="100%" height={5} />
                                </p>
                            </div>
                        )
                    })
                }
            </SkeletonTheme>
        </div>
    )
}